import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Tweets', timestamps: true })
export class Tweet extends Model<Tweet> {
  @Column
  tweetId: string;

  @Column
  isPinned: boolean;
}
