import { EventEmitter } from 'events';
// import { EClientRequireErr, EKeyRequireErr, ELockExistErr, ELockRegisterErr, ENodeidRequireErr, ETTLInvalid } from './error.instance';
// import * as EVC from './enums/index';

export class LibVectorLock extends EventEmitter {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(private etcd: any, private key: string, private nodeId: string, private ttl: number = 1) {
        super();
    }

    public destory(): void {
        // destory
        return;
    }

    public lock(): void {
        // lock
        return;
    }

    public unLock(): void {
        // unLock
        return;
    }

    public reNew(): void {
        // reNew
        return;
    }
}
