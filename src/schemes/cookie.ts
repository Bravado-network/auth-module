import type {
  SchemePartialOptions,
  SchemeCheck,
  HTTPRequest,
  HTTPResponse,
  TokenableScheme
} from '../types'
import type { Auth } from '../core'
import { LocalScheme, LocalSchemeEndpoints, LocalSchemeOptions } from './local'

export interface CookieSchemeEndpoints extends LocalSchemeEndpoints {
  csrf: HTTPRequest
}

export interface CookieSchemeCookie {
  name: string
  httpOnly: boolean
}

export interface CookieSchemeOptions extends LocalSchemeOptions {
  endpoints: CookieSchemeEndpoints
  cookie: CookieSchemeCookie
}

const DEFAULTS: SchemePartialOptions<CookieSchemeOptions> = {
  name: 'cookie',
  cookie: {
    name: null,
    httpOnly: false
  },
  token: {
    type: '',
    property: '',
    maxAge: false,
    global: false,
    required: false
  },
  endpoints: {
    csrf: null
  }
}

export class CookieScheme<
    OptionsT extends CookieSchemeOptions = CookieSchemeOptions
  >
  extends LocalScheme<OptionsT>
  implements TokenableScheme<OptionsT>
{
  constructor($auth: Auth, options: SchemePartialOptions<CookieSchemeOptions>) {
    super($auth, options, DEFAULTS)
  }

  mounted(): Promise<HTTPResponse | void> {
    if (process.server) {
      this.$auth.ctx.$axios.setHeader(
        'referer',
        this.$auth.ctx.req.headers.host
      )
    }

    return super.mounted()
  }

  check(): SchemeCheck {
    const response = { valid: false }

    // Patch #2: Check if token is required (we don't use it) and skip condition
    //           otherwise it will always return false
    if (this.options.token.required && !super.check().valid) {
      return response
    }

    // Patch #3: Check is cookie server-only and we need to send a request
    const processChecking = this.options.cookie.httpOnly ? process.server : true

    if (this.options.cookie.name && processChecking) {
      const cookies = this.$auth.$storage.getCookies()
      response.valid = Boolean(cookies[this.options.cookie.name])
      return response
    }

    response.valid = true
    return response
  }

  async login(endpoint: HTTPRequest): Promise<HTTPResponse> {
    // Ditch any leftover local tokens before attempting to log in
    this.$auth.reset()

    // Make CSRF request if required
    if (this.options.endpoints.csrf) {
      await this.$auth.request(this.options.endpoints.csrf, {
        maxRedirects: 0
      })
    }

    return super.login(endpoint, { reset: false })
  }

  reset(): void {
    if (this.options.cookie.name) {
      this.$auth.$storage.setCookie(this.options.cookie.name, null, {
        prefix: ''
      })
    }

    return super.reset()
  }
}
