import { WritableStream } from 'memory-streams';
import { ENTER, ESC, BACKSPACE } from './constants';
import { RepeatPrompt } from './RepeatPrompt';
import { Prompt } from 'jest-watcher';
import delay from 'delay'

test('[Enter] will resolve with value entered', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('2')
  subject.onKey('3')
  subject.onKey(ENTER)
  await delay(10)
  subject.onKey(ENTER)

  expect(await running).toEqual({ repeat: 123, enableFailMode: false })
})

test('Non-number is ignored when entering repeat', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('A')
  subject.onKey('2')
  subject.onKey(ENTER)
  await delay(10)
  subject.onKey(ENTER)

  expect(await running).toEqual({ repeat: 12, enableFailMode: false })
})

test('honor backspace', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey(BACKSPACE)
  subject.onKey('2')
  subject.onKey(ENTER)
  await delay(10)
  subject.onKey(ENTER)

  expect(await running).toEqual({ repeat: 1, enableFailMode: false })
})

test('[Esc] rejects', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey(ESC)

  return running.then(() => { throw new Error('should not reach') }, () => { })
})

describe('enableFailMode prompt', () => {
  test('other keys not register', async () => {
    const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
    const running = subject.run()

    subject.onKey('1')
    subject.onKey(ENTER)
    await delay(10)
    subject.onKey('x')
    subject.onKey('Y')

    expect(await running).toEqual({ repeat: 1, enableFailMode: true })
  })

  test('[Enter] is false', async () => {
    const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
    const running = subject.run()

    subject.onKey('1')
    subject.onKey(ENTER)
    await delay(10)
    subject.onKey(ENTER)

    expect(await running).toEqual({ repeat: 1, enableFailMode: false })
  })

  test('n is false', async () => {
    const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
    const running = subject.run()

    subject.onKey('1')
    subject.onKey(ENTER)
    await delay(10)
    subject.onKey('n')

    expect(await running).toEqual({ repeat: 1, enableFailMode: false })
  })

  test('N is false', async () => {
    const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
    const running = subject.run()

    subject.onKey('1')
    subject.onKey(ENTER)
    await delay(10)
    subject.onKey('N')

    expect(await running).toEqual({ repeat: 1, enableFailMode: false })
  })

  test('y is true', async () => {
    const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
    const running = subject.run()

    subject.onKey('1')
    subject.onKey(ENTER)
    await delay(10)
    subject.onKey('y')

    expect(await running).toEqual({ repeat: 1, enableFailMode: true })
  })

  test('Y is true', async () => {
    const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
    const running = subject.run()

    subject.onKey('1')
    subject.onKey(ENTER)
    await delay(10)
    subject.onKey('Y')

    expect(await running).toEqual({ repeat: 1, enableFailMode: true })
  })
});

class MemoryPrompt extends Prompt {
  value = ''
  onChange
  onSuccess
  onCancel
  put(key: string) {
    if (key === ESC) {
      this.onCancel()
    }
    else if (key === ENTER) {
      this.onSuccess(this.value)
    }
    else {
      this.value += key
      this.onChange(this.value)
    }
  }
  enter(onChange, onSuccess, onCancel) {
    this.onChange = onChange
    this.onSuccess = (v: string) => {
      onSuccess(v)
      this.value = ''
    }
    this.onCancel = onCancel
  }
}
