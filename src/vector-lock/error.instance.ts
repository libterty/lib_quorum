/**
 * @classdesc Error Base
 * @private
 * @param {string} message Error Message
 */
class ErrorBase {
  public readonly stack: string;
  constructor (private message: string) {
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

/**
 * @classdesc Client Requirement Error
 * @public
 */
export class EClientRequireErr extends ErrorBase {
  constructor() {
    super('client parameter is required');
  }
}

/**
 * @classdesc Key Requirement Error
 * @param {string} type Error Key type
 * @public
 */
export class EKeyRequireErr extends ErrorBase {
  constructor(type: string) {
    super(`key parameter of type ${type} is required`);
  }
}

/**
 * @classdesc Node Id Requirement Error
 * @public
 */
export class ENodeidRequireErr extends ErrorBase {
  constructor() {
    super(`node id parameter of type String is required`);
  }
}

/**
 * @classdesc TTL Error
 * @public
 */
export class ETTLInvalid extends ErrorBase {
  constructor() {
    super(`TTL parameter must be typeof number`);
  }
}

/**
 * @classdesc Lock Existed Error
 * @param {string} key Lock Key
 * @public
 */
export class ELockExistErr extends ErrorBase {
  constructor(key: string) {
    super(`Lock key ${key} is already existed`);
  }
}

/**
 * @classdesc Lock Registered Error
 * @param {string} key Lock Key
 * @param {string} nodeId node id
 * @public
 */
export class ELockRegisterErr extends ErrorBase {
  constructor(key: string, nodeId: string) {
    super(`Lock Key ${key} is not registerd to Node ${nodeId}`);
  }
}
