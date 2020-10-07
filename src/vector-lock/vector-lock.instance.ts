import { EventEmitter } from 'events';
import * as ETCD from 'etcd3';
import { EClientRequireErr, EKeyRequireErr, ENameSpaceRequireErr, ENodeidRequireErr, ETTLInvalid } from './error.instance';
// import * as EVC from './enums/index';
import * as IETCD from './interfaces/index';

export class LibVectorLock extends EventEmitter {
    // readonly area
    public readonly _key: string;
    public readonly _nodeId: string;
    public readonly _ttl: number;
    private readonly _etcdOpts: ETCD.IOptions;
    public readonly _namespace: string;

    public _etcd: ETCD.Namespace;

    constructor(private etcdOpts: IETCD.IETCDOpts, public namespace: string, public key: string, public nodeId: string, public ttl: number = 1) {
        super();
        // init error handling
        if (typeof etcdOpts !== 'object') throw new EClientRequireErr();
        if (typeof etcdOpts.endpoints === 'undefined') throw new TypeError(`ETCD Endpoint parameters must be string`);
        if (typeof etcdOpts.passwords === 'undefined') throw new TypeError(`ETCD Password parameters must be string`);
        if (typeof etcdOpts.users === 'undefined') throw new TypeError(`ETCD User parameters must be string`);
        if (typeof namespace !== 'string') throw new ENameSpaceRequireErr();
        if (typeof key !== 'string') throw new EKeyRequireErr('string');
        if (typeof nodeId !== 'string') throw new ENodeidRequireErr();
        if (isNaN(ttl)) throw new ETTLInvalid();

        // init etcd3
        this._etcdOpts = {
            hosts: etcdOpts.endpoints,
            auth: {
                username: etcdOpts.users,
                password: etcdOpts.passwords,
            },
        };
        this._namespace = namespace;
        this._etcd = new ETCD.Etcd3(this._etcdOpts).namespace(this._namespace);
    }

    public getWords(): Promise<unknown | IETCD.IWord[]> {
        return new Promise<unknown | IETCD.IWord[]>((resolve, reject) => {
            this._etcd
                .getAll()
                .strings()
                .then((values: any) => {
                    const words = [];
                    for (const key of values) {
                        words.push({ word: key, definition: values[key] });
                    }
                    resolve(words);
                })
                .catch((error) => reject(error));
        });
    }
}
