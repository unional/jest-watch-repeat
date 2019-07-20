import { Prompt } from 'jest-watcher';
import { unpartial } from 'unpartial';
import { RepeatPrompt } from './RepeatPrompt';

export interface RepeatOptions {
  key: string,
  prompt: string,
  'always-repeat': boolean
}

export class RepeatPlugin {
  config: RepeatOptions
  prompt: RepeatPrompt
  repeatCount = 0
  updateConfigAndRun
  constructor({ stdout, config }: {
    config: Partial<RepeatOptions>,
    stdout: any
  }) {
    this.config = unpartial({ key: 'r', prompt: 'repeat test runs', 'always-repeat': false }, config)
    this.prompt = new RepeatPrompt(stdout, new Prompt())
  }

  // Add hooks to Jest lifecycle events
  apply(jestHooks) {
    jestHooks.onTestRunComplete((results: jest.AggregatedResult) => {
      if (!results.success && !this.config['always-repeat']) {
        this.repeatCount = 0
      }
      else if (this.repeatCount > 0) {
        this.repeatCount--
        this.updateConfigAndRun({ mode: 'watch' })
      }
    })
  }

  // Get the prompt information for interactive plugins
  getUsageInfo() {
    return { key: this.config.key, prompt: this.config.prompt }
  }

  onKey(key: string) {
    this.prompt.onKey(key)
  }
  // Executed when the key from `getUsageInfo` is input
  run(_globalConfig, updateConfigAndRun) {
    this.updateConfigAndRun = updateConfigAndRun
    return this.prompt.run().then(value => {
      this.repeatCount = value - 1
      if (this.repeatCount > 0) updateConfigAndRun({ mode: 'watch' })
    })
  }
}
