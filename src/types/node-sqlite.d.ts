/**
 * src/types/node-sqlite.d.ts
 *
 * Ambient TypeScript type definitions for Node.js built-in 'node:sqlite' module,
 * ensuring type safety and clean compilation under older @types/node versions.
 */

declare module "node:sqlite" {
  export class DatabaseSync {
    /**
     * Creates a new DatabaseSync instance.
     * @param filename The path to the SQLite database file. Use ':memory:' for an in-memory database.
     */
    constructor(filename: string, options?: { open?: boolean });

    /**
     * Closes the database connection.
     */
    close(): void;

    /**
     * Executes one or more SQL statements.
     */
    exec(sql: string): void;

    /**
     * Prepares an SQL statement for execution.
     */
    prepare(sql: string): StatementSync;
  }

  export class StatementSync {
    /**
     * Executes the prepared statement and returns all matching rows.
     */
    all(namedParams?: Record<string, any>): any[];
    all(...positionalParams: any[]): any[];

    /**
     * Executes the prepared statement and returns the first matching row.
     */
    get(namedParams?: Record<string, any>): any;
    get(...positionalParams: any[]): any;

    /**
     * Executes the prepared statement.
     */
    run(namedParams?: Record<string, any>): { changes: number; lastInsertRowid: number | bigint };
    run(...positionalParams: any[]): { changes: number; lastInsertRowid: number | bigint };
  }
}
