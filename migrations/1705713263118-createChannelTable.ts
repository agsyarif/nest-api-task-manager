import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChannelTable1705715263118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "channel",
                columns: [
                    {
                        name: "channelId",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "notes",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("channel")
    }

}
