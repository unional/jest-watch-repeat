import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
import { Writable } from 'stream';
import { ENTER, ESC, isDigit, BACKSPACE } from './constants';
import { Prompt } from 'jest-watcher';

export class RepeatPrompt {
  state = 'repeat'
  constructor(public pipe, public prompt: Prompt) {
  }

  onKey(key: string) {
    switch (this.state) {
      case 'repeat':
        if (isDigit(key) || key === ESC || key === ENTER || key === BACKSPACE) this.prompt.put(key)
        break;
      case 'failmode':
        if (key === ENTER || key === 'n' || key === 'N') {
          this.prompt.put('N')
          this.prompt.put(ENTER)
        }
        else if (key === 'y' || key === 'Y') {
          this.prompt.put('Y')
          this.prompt.put(ENTER)
        }
        break;
    }
  }

  async run() {
    this.pipe.write(ansiEscapes.cursorHide);
    this.pipe.write(ansiEscapes.clearScreen);

    const repeat = await this.getRepeat()
    const enableFailMode = await this.getEnableFailMode()
    return { repeat, enableFailMode }
  }

  getRepeat() {
    this.state = 'repeat'
    this.pipe.write(`
Repeat Mode Usage
     ${chalk.dim(`› Press`)} Esc ${chalk.dim(`to exit repeat mode.`)}
     ${chalk.dim(`› Press`)} Enter ${chalk.dim(`to repeat test run n times.`)}
`)

    printRepeatCaret('', this.pipe)
    this.pipe.write(ansiEscapes.cursorShow);

    return new Promise<number>((a, r) => {
      this.prompt.enter(value => {
        this.pipe.write(ansiEscapes.eraseLine)
        this.pipe.write(ansiEscapes.cursorLeft)
        printRepeatCaret(value, this.pipe)
      }, v => a(Number.parseInt(v, 10)), r)
    })
  }
  getEnableFailMode() {
    this.state = 'failmode'
    this.pipe.write(`
Run only failed tests?
`)

    // printYNCaret('N', this.pipe)
    // this.pipe.write(ansiEscapes.cursorShow);

    return new Promise<boolean>((a, r) => {
      this.prompt.enter(() => {
        this.pipe.write(ansiEscapes.eraseLine)
        this.pipe.write(ansiEscapes.cursorLeft)
        printYNCaret('', this.pipe)
      }, v => {
        a(v === 'Y')
      }, r)
    })
  }
}

const printRepeatCaret = (value: string, pipe: Writable) => {
  pipe.write(ansiEscapes.eraseDown);
  pipe.write(`${chalk.dim(' repeat ›')} ${value}`);
  pipe.write(ansiEscapes.cursorSavePosition);
}

const printYNCaret = (value: string, pipe: Writable) => {
  pipe.write(ansiEscapes.eraseDown);
  pipe.write(`${chalk.dim(' (Y/N) ›')} ${'N'}`);
}
