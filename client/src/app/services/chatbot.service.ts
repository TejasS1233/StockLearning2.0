import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Message {
  text: string;
  sender: 'user' | 'ai';
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = environment.backendUrl + '/api/chatbot';

  constructor(private http: HttpClient) {}

  getChatbotResponse(message: string): Observable<Message> {
    return this.http
      .post<{ reply: string }>(this.apiUrl, { message })
      .pipe(map((response) => ({ text: response.reply, sender: 'ai' })));
  }
}
