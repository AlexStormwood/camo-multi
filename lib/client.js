


/**
 * @abstract
 */
export class DatabaseClient {

    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url;

        if (DatabaseClient._dbClient) {
            throw new Error('Disconnect from the current database before operating on a new one! Multi-DB support is not great right now.');
        }
        DatabaseClient._dbClient = this;

        // exporting frequently used client methods here, available once the client instance is set up.
        // indirections via getClientInstance().toNativeId() are wasting cycles
        // TODO think of nicer solution; remove most/all DB()... indirections where allowed
        DatabaseClient.toCanonicalId = DatabaseClient._dbClient.toCanonicalId;
        DatabaseClient.isNativeId = DatabaseClient._dbClient.isNativeId;
    }

    /** @type {DatabaseClient} */
    static _dbClient = null;
    static toCanonicalId = null;
    static isNativeId = null;

    /**
     * @return {DatabaseClient}
     * @throws Error if no {@link DatabaseClient} instance has been created yet
     */
    static getClientInstance = () => {
        if (!DatabaseClient._dbClient) {
            throw new Error('You must first call \'connect\' before loading/saving documents.');
        }
        return DatabaseClient._dbClient;
    };



    save(collection, query, values) {
        throw new TypeError('You must override save.');
    }

    delete(collection) {
        throw new TypeError('You must override delete.');
    }

    deleteOne(collection, query) {
        throw new TypeError('You must override deleteOne.');
    }

    deleteMany(collection, query) {
        throw new TypeError('You must override deleteMany.');
    }

    findOne(collection, query) {
        throw new TypeError('You must override findOne.');
    }

    findOneAndUpdate(collection, query, values, options) {
        throw new TypeError('You must override findOneAndUpdate.');
    }

    findOneAndDelete(collection, query, options) {
        throw new TypeError('You must override findOneAndDelete.');
    }

    find(collection, query, options) {
        throw new TypeError('You must override findMany.');
    }

    count(collection, query) {
        throw new TypeError('You must override count.');
    }

    createIndex(collection, field, options) {
        throw new TypeError('You must override createIndex.');
    }

    static connect(url, options) {
        throw new TypeError('You must override connect (static).');
    }

    close() {
        // throw new TypeError('You must override close.');
        DatabaseClient._dbClient = null;
        DatabaseClient.isNativeId = null;
        DatabaseClient.toCanonicalId = null;
    }

    clearCollection(collection) {
        throw new TypeError('You must override clearCollection.');
    }

    /** @internal (testing purposes only) */
    _dropDatabase() {
        throw new TypeError('You must override _dropDatabase.');
    }

    toCanonicalId(id) {
        throw new TypeError('You must override toCanonicalId.');
    }

    isNativeId(value) {
        throw new TypeError('You must override isNativeId.');
    }

    toNativeId(id) {
        return this.nativeIdType()(id);
    }

    nativeIdType() {
        throw new TypeError('You must override nativeIdType.');
    }

    driver() {
        throw new TypeError('You must override driver.');
    }
}

