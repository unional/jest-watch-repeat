import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
import { Writable } from 'stream';
import { ENTER, ESC, isDigit, BACKSPACE } from './constants';

export class RepeatPrompt {
  constructor(public pipe, public prompt) {
  }

  onKey(key: string) {
    if (isDigit(key) || key === ESC || key === ENTER || key === BACKSPACE) this.prompt.put(key)
  }

  run() {
    this.pipe.write(ansiEscapes.cursorHide);
    this.pipe.write(ansiEscapes.clearScreen);

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
}

const printRepeatCaret = (value: string, pipe: Writable) => {
  pipe.write(ansiEscapes.eraseDown);
  pipe.write(`${chalk.dim(' repeat ›')} ${value}`);
  pipe.write(ansiEscapes.cursorSavePosition);
}
