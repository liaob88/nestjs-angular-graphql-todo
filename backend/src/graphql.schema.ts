
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface InputTask {
    title: string;
    task: string;
}

export interface Task {
    id: string;
    title: string;
    task: string;
}

export interface IMutation {
    createTask(task: InputTask): string | Promise<string>;
    updateTask(id: string, task: InputTask): string | Promise<string>;
    deleteTask(id?: string): string | Promise<string>;
}

export interface IQuery {
    getTasks(): Task[] | Promise<Task[]>;
    getTask(id: string): Task | Promise<Task>;
}
