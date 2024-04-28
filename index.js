
export {connect} from './lib/nedbclient.js';
import {DatabaseClient as DatabaseClient} from './lib/client.js';
let getClientInstance = DatabaseClient.getClientInstance;
export {getClientInstance as getClient}; 
export {Document} from './lib/document.js';
export {EmbeddedDocument} from './lib/embedded-document.js';
export {setUnknownDataKeyBehavior} from './lib/base-document.js';