import {Article, Card, Comment, Conversation, Message, transaction, Photo, User, Version} from './schemas';
import transactions from '../raw/transactions';

export default [
  {
    schema: [User, Article, Comment, Photo, Version, transaction, Message, Card, Conversation],
    schemaVersion: 1,
    migration(oldRealm, newRealm) {
      const newObjects = newRealm.objects('transaction');

      for (let i = 0; i < newObjects.length; i++) {
        newObjects[i].type = transactions[i].type;
      }
    }
  }
];
