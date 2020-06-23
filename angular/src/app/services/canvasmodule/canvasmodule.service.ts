import { Injectable } from '@angular/core';
declare function io(): any;

import { CanvasModule } from '../../interfaces/canvasModule';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {
  socket = io();

  moduleArray: Array<CanvasModule> = [];

  constructor(private http: HttpClient) {
    this.loadModules();
  }

  ngOnInit() {

    this.socket.on('new doc', (module) => {
      this.moduleArray.push(module);
    });

  }

  // creates new module with type 'doc'
  moduleCreate(content: string, type: string): void {
    const module: CanvasModule = {
      _id: undefined, // defined from database
      idHTML: 1,
      type: type,
      position: {
        x: 1,
        y: 1,
        width: 1,
        height: 1
      },
      content: content,
    };
    console.log(module);
    this.socket.emit('new module', (module));
  }

  moduleArrayPush(module) {
    this.moduleArray.push(module);
  }

  // emits 'module edited' to initiate the edit of a module
  moduleEdit(object) {
    this.moduleArrayEdit(object);
    console.log(this.moduleArray);
    this.socket.emit('module edited', (object));
  }

  // replaces the module in moduleArray if module is edited
  moduleArrayEdit(object) {
    for (let i = 0; i < this.moduleArray.length; i++) {
      const module = this.moduleArray[i];
      if (module._id == object._id) {
        // checks if the content has changed
        if (module.content != object.content) {
          // console.log(module.content);
          // console.log(object.content);
          this.moduleArray.splice(i, 1, object);
        }
        // checks if the x or y position has changed
        if (module.position.x != object.position.x || module.position.y != object.position.y) {
          // console.log(module.position);
          // console.log(object.position);
          this.moduleArray.splice(i, 1, object);

        }
      }
    }
  }

  // emits 'module deleted' to initiate the delete of a module
  moduleDelete(deleteObject) {
    this.socket.emit('module deleted', (deleteObject));
  }

  // splices module in moduleArray if module is deleted
  moduleArrayDelete(object) {
    for (let i = 0; i < this.moduleArray.length; i++) {
      const module = this.moduleArray[i];
      console.log(module);
      if (module._id == object._id) {
        console.log(this.moduleArray[i]);
        this.moduleArray.splice(i, 1);
      }
    }
  }

  //loads module DB
  loadModules() {

    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/modules', option).subscribe(response => {
      // type change object(which is an array actually) -> any
      let data: any = response;
      let newDisplayedArray: Array<CanvasModule> = [];

      // go to the whole array and split each item into these two new Arrays
      for (let i = 0; i < data.length; i++) {
        newDisplayedArray.push(data[i]);
      }
      this.moduleArray = newDisplayedArray;
      console.log(this.moduleArray);
    });
    console.log("DB loaded");
  }


}
