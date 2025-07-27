import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, Message } from '../services/chatbot.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css'],
})
export class Chatbot implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatMessagesContainer')
  private chatMessagesContainer!: ElementRef;

  messages: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  private chatSubscription!: Subscription;

  constructor(
    private chatbotService: ChatbotService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.messages.push({
      text: "Hello! I'm your AI Stock Learning Assistant. How can I help you learn about stocks today? Ask me about market basics, investment strategies, or specific terms!",
      sender: 'ai',
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const userMessage = this.newMessage.trim();
    if (userMessage === '') {
      return;
    }

    this.messages.push({ text: userMessage, sender: 'user' });
    this.newMessage = '';
    this.isLoading = true;

    this.chatSubscription = this.chatbotService
      .getChatbotResponse(userMessage)
      .subscribe({
        next: (response: Message) => {
          this.messages.push(response);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching AI response:', err);
          this.messages.push({
            text: 'Oops! Something went wrong. Please try again later.',
            sender: 'ai',
          });
          this.isLoading = false;
        },
      });
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop =
        this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  ngOnDestroy(): void {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }

  public formatMessage(text: string): SafeHtml {
    const bolded = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const withLineBreaks = bolded.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(withLineBreaks);
  }
}
