import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

// this is our base class Generic Store for Card or other module....
export class Store<T> {

    state$ : Observable<T>;
    private _state$ : BehaviorSubject<T>; // this is a observer and observable at the same time

    constructor(initialState: T){
        //best opportunity to instance
        this._state$ = new BehaviorSubject<T>(initialState);
        this.state$ = this._state$.asObservable();
    }

    // this line is to convert onto Observable for use onto our components
    select<T>(selectorFunction:any): Observable<T> {
        return this.state$.pipe(
            distinctUntilChanged(),
            map(selectorFunction));
        
    }
    // sync
    get state() {
        return this._state$.getValue(); // this function has to return T
    }

    protected setState(nexState: T): void{
        console.log('------------');
        console.log('Previous State', this.state);
        
        this._state$.next(nexState);

        console.log('Current State', this.state);
        console.log('----------');
        
    }
}