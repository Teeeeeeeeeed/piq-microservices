import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Init11693396973234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const transaction = await queryRunner.startTransaction();

    try {
      await queryRunner.createTable(
        new Table({
          name: 'user',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'mobile',
              type: 'varchar',
            },
            {
              name: 'addressId',
              type: 'int',
            },
          ],
        }),
      );

      await queryRunner.createTable(
        new Table({
          name: 'address',
          columns: [
            {
              name: 'id',
              type: 'int',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'address',
        new TableForeignKey({
          columnNames: ['addressId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'address',
        }),
      );

      // Commit the transaction if everything is successful
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
