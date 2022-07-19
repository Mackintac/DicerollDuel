import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountsModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 14,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  first_name!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  last_name!: string;
}

export default AccountsModel;
