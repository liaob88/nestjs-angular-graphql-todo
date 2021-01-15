
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Task {
    id: string;
    title: string;
    task: string;
}

export interface IQuery {
    getTasks(): Task[] | Promise<Task[]>;
    getTask(id: string): Task | Promise<Task>;
}
