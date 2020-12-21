import { tap } from "rxjs/operators"
import { BehaviorSubject, Observable } from "rxjs"
import { HttpClient} from "@angular/common/http"
import { Injectable} from "@angular/core"
import { ResolveStart, Router, RouterEvent } from "@angular/router"
import { LoadingService } from "../loading.service"

import { environment } from "src/environments/environment"

@Injectable({
    providedIn: "root"
})

export class AuthService  {
  public authenticationState = new BehaviorSubject(false);
  public token = undefined;
  public user:any = undefined;

  private routeSubscription:any = undefined;
  private url = "";

  constructor(
    private router:Router,
    private httpClient:HttpClient,
    private loadingService:LoadingService
  ) {   
      this.url = environment.url    

      this.authenticate()

      this.authenticationState.subscribe(state => {
          if (state) {
              this.routeSubscription = this.router.events.subscribe((event:RouterEvent) => {
                  if (event instanceof ResolveStart) {
                      this.refreshAccount().subscribe()
                  }
              })
          } else {
              if (this.routeSubscription) {
                  this.routeSubscription.unsubscribe()
              }
          }
      })    
  }

  protected authenticate():boolean {
      this.token = this.getStoredToken()
      this.user = this.getStoredUser()

      if (this.token && this.user) {
          this.authenticationState.next(true)
      } else {
          this.authenticationState.next(false)
      }

      return this.authenticationState.value
  }

  protected getStoredToken():string {
      return localStorage.getItem("token")
  }

  protected getStoredUser():string {
      return JSON.parse(localStorage.getItem("user"))
  }

  protected removeStoredTokenAndUser():void {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
  }

  protected setStoredTokenAndUser(token:string, user:string):void {
      if (token !== this.token) {
          localStorage.setItem("token", token)
      }

      if (user !== JSON.stringify(this.user)) {
          localStorage.setItem("user", user)
      }
  }

  public changePassword(data:unknown):Observable<any> {
      return this.httpClient.put(this.url+"account/change-password",data).pipe(tap((response:any) => {
          const resp:any = response

          console.log(resp)
      }))
  }

  public isAdmin():boolean {
      const user = this.user

      if (user) {
          if (user.roles) {
              if(user.roles.length > 0){
                  return user.roles.map(item => item.slug).includes("admin")
              }
          }
      }

      return false
  }

  public isAuthenticated():boolean {
      return this.authenticationState.value
  }

  public login(data:unknown, intended:string):Observable<any> {
      this.loadingService.presentLoading()

      return this.httpClient.post(this.url+"login", data).pipe(tap((response:any) => {
          this.loadingService.dismissLoading()

          const resp:any = response
          const token = resp.data.token
          const user = JSON.stringify(resp.data.user)

          this.setStoredTokenAndUser(token, user)

          this.authenticate()

          this.router.navigate(JSON.parse(intended))
      },()=>{
          this.loadingService.dismissLoading()
      }))
  }

  public logout():void {  
      this.removeStoredTokenAndUser()

      this.authenticate()

      this.router.navigate(["/login"])
  }

  public refreshAccount():Observable<any> {
      return this.httpClient.get(this.url+"account").pipe(tap((response:any) => {
          const resp:any = response
          const user = JSON.stringify(resp.data.user)

          this.setStoredTokenAndUser(this.token, user)
      }))
  }
  
  public register(data:unknown):Observable<any> {
      this.loadingService.presentLoading()

      return this.httpClient.post(this.url+"register", data).pipe(tap((response:any) =>{
          this.loadingService.dismissLoading()

          const resp:any = response
          const token = resp.data.token
          const user = JSON.stringify(resp.data.user)

          this.setStoredTokenAndUser(token, user)

          this.authenticate()

          this.router.navigate(["/tabs/tab1"])
      },()=>{
          this.loadingService.dismissLoading()
      }))
  }

  public requestPasswordReset(data:unknown):Observable<any> {
      this.loadingService.presentLoading()

      return this.httpClient.post(this.url+"password/email", data).pipe(tap((response:any) =>{
          this.loadingService.dismissLoading()

          const resp:any = response
          console.log(resp)

          this.router.navigate(["login"])

      },()=>{
          this.loadingService.dismissLoading()
      }))
  }

  public updateAccount(data:unknown):Observable<any> {
      this.loadingService.presentLoading()
      return this.httpClient.put(this.url+"account", data).pipe(tap((response:any) => {
          this.loadingService.dismissLoading()
          const resp:any = response
          const user = JSON.stringify(resp.data.user)

          this.setStoredTokenAndUser(this.token, user)
      
      },()=>{
          this.loadingService.dismissLoading()
      }))
  }

  

  public updateFCMToken(token:string):Observable<any> {
      const data = {
          token: token
      }

      return this.httpClient.put(this.url+"account/fcm-token", data).pipe(tap((response:any) => {
          const resp:any = response

          console.log(resp)
      }))
  }
}
