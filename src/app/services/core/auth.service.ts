import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../../models/User";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";


interface LoginPayload {
    username: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = `${environment.apiBaseUrl}/auth`;
    private tokenKey = 'access_token';
    private userKey = 'user';

    private currentUserSubject = new BehaviorSubject<User | null>(null);

    public currentUser$ = this.currentUserSubject.asObservable();
    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromLocalStorage();
    }

    private loadUserFromLocalStorage(): void {
        const userJson = localStorage.getItem('user');
        try {
            if (userJson) {
                const parsedUser = JSON.parse(userJson);
                this.currentUserSubject.next(parsedUser);
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage:", e);
            localStorage.removeItem('user'); // xoá dữ liệu hỏng nếu có
        }
    }

    login(payload: LoginPayload): Observable<User> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/log-in`, payload)
            .pipe(
                map((res: AuthResponse) => {
                    this.setToken(res.token)
                    this.setCurrentUser(res.user)
                    return res.user
                }),
                catchError(this.handleError)
            );
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token)
    }

    private clearToken(): void {
        localStorage.removeItem(this.tokenKey)
    }

    private setCurrentUser(user: User): void {
        this.currentUserSubject.next(user)
        localStorage.setItem(this.userKey, JSON.stringify(user))
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let message = 'An unknown error occurred! ';
        if (error.error instanceof ErrorEvent) {
            // Lỗi phía client (mạng, không gọi được server, v.v.)
            message = `Client-side error: ${error.error.message}`;
        } else {
            // Lỗi từ phía server trả về
            if (typeof error.error === 'string') {
                message = `Server-side error: ${error.status} - ${error.error}`;
            } else {
                message = `Server-side error: ${error.status} - ${error.message}`;
            }
        }
        console.error('HTTP Error:', error);
        return throwError(() => new Error(message));
    }
}