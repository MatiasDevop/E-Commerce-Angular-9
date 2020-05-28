import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {

    state$ : Observable<T>;
    private _state$ : BehaviorSubject<T>; // this is a observer and observable at the same time

    constructor(initialState: T){
        //best opportunity to instance
        this._state$ = new BehaviorSubject<T>(initialState);
        this.state$ = this._state$.asObservable();
    }

    // sync
    get state(){
        return this._state$.getValue(); // this function has to return T
    }

    protected setState(nexState: T): void{
        console.log('------------');
        console.log('Previus State', this.state);
        
        this._state$.next(nexState);

        console.log('Current State', this.state);
        console.log('----------');
        
    }
}