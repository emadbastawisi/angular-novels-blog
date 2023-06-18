import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs:AngularFirestore) { }

  loadFeatured() {
    return this.afs.collection('posts' , ref => ref.where('isFeatured', '==' , true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    );
  }
  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    );
  }
  loadCategoryPosts(categortId:string | null) {
    return this.afs.collection('posts' , ref => ref.where('category.categoryId', '==' , categortId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    );
  }
  loadSinglePost(postId:string | undefined) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }
  loadRelatedPosts(categoryId:string | undefined) {
    return this.afs.collection('posts' , ref => ref.where('category.categoryId', '==' , categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    );
  }
  
  countViews(postId:string | undefined ) {
    const viewsCount = {
      views :firebase.default.firestore.FieldValue.increment(1)
    }
    return this.afs.doc(`posts/${postId}`).update(viewsCount);
  }
}
