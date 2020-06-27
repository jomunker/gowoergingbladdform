import { Injectable } from '@angular/core';

import { CanvasModuleService } from '../canvasmodule/canvasmodule.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public canvasmoduleservice: CanvasModuleService) { }

  addTodo(object, todo) {
    for (let i = 0; i < this.canvasmoduleservice.moduleArray.length; i++) {
      const module = this.canvasmoduleservice.moduleArray[i];
      if (module._id == object._id) {
        if (todo != '') {
          console.log(object.content);
          object.content.push({checked: false, editing: false, todoString: todo});
          this.canvasmoduleservice.moduleEdit(object);
        } else {
          console.log("Please enter a ToDo!");
        }
      }
    }
  }

  deleteTodo(object, todo) {
    for (let i = 0; i < this.canvasmoduleservice.moduleArray.length; i++) {
      const module = this.canvasmoduleservice.moduleArray[i];
      if (module._id == object._id) {
        console.log(object.content.length);
        for (let j = 0; j < object.content.length; j++) {
          console.log(object.content[j]);
          if (object.content[j] == todo) {
            object.content.splice(j, 1);
            this.canvasmoduleservice.moduleEdit(object);
          }
        }
      }
    }
  }

  editTodo(object, todo) {
    for (let i = 0; i < this.canvasmoduleservice.moduleArray.length; i++) {
      const module = this.canvasmoduleservice.moduleArray[i];
      if (module._id == object._id) {
        console.log(object.content.length);
        for (let j = 0; j < object.content.length; j++) {
          console.log(object.content[j]);
          if (object.content[j] == todo) {
            todo.editing = true;
            object.content.splice(j, 1, todo);
            this.canvasmoduleservice.moduleEdit(object);
          }
        }
      }
    }
  }

  editDone(object, todo) {
    for (let i = 0; i < this.canvasmoduleservice.moduleArray.length; i++) {
      const module = this.canvasmoduleservice.moduleArray[i];
      if (module._id == object._id) {
        console.log(object.content.length);
        for (let j = 0; j < object.content.length; j++) {
          console.log(object.content[j]);
          if (object.content[j] == todo) {
            todo.editing = false;
            object.content.splice(j, 1, todo);
            this.canvasmoduleservice.moduleEdit(object);
          }
        }
      }
    }
  }



}
