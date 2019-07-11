import { WritableStream } from 'memory-streams';
import { ENTER, ESC, BACKSPACE } from './constants';
import { RepeatPrompt } from './RepeatPrompt';

test('[Enter] will resolve with value entered', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('2')
  subject.onKey('3')
  subject.onKey(ENTER)

  expect(await running).toBe(123)
})

test('Non-number is ignored', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey('A')
  subject.onKey('2')
  subject.onKey(ENTER)

  expect(await running).toBe(12)
})

test('honor backspace', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey('1')
  subject.onKey(BACKSPACE)
  subject.onKey('2')
  subject.onKey(ENTER)

  expect(await running).toBe(1)
})

test('[Esc] rejects', async () => {
  const subject = new RepeatPrompt(new WritableStream(), new MemoryPrompt())
  const running = subject.run()

  subject.onKey(ESC)

  return running.then(() => { throw new Error('should not reach') }, () => { })
})


class MemoryPrompt {
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
    this.onSuccess = onSuccess
    this.onCancel = onCancel
  }
}
