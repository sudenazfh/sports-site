// Tek mock veri kaynağı — backend gelince burası API çağrılarına dönüşür.

import eventFootball from '../assets/event-football.jpg'
import eventMarathon from '../assets/event-marathon.png'
import eventRunning from '../assets/event-running.jpg'
import eventVolleyball from '../assets/event-volleyball.png'

// API'den gelen etkinliklerde görsel yok — kategoriye göre yerel görsel eşle
export function categoryImage(category) {
  return CATEGORY_IMAGES[category] ?? eventFootball
}

export const events = [
  { id: 1, name: 'APOEL vs Omonai Derby', category: 'FOOTBALL', image: eventFootball, date: 'August 3, 2026', city: 'Nicosia', taken: 15, capacity: 50, price: 25 },
  { id: 2, name: 'Famagusta International Marathon', category: 'MARATHON', image: eventMarathon, date: 'August 15, 2026', city: 'Famagusta', taken: 90, capacity: 100, price: 45 },
  { id: 3, name: 'Cablenet Run', category: 'RUNNING', image: eventRunning, date: 'October 11, 2026', city: 'Famagusta', taken: 300, capacity: 450, price: 0 },
  { id: 4, name: 'Beach Volleyball Cyprus', category: 'VOLLEYBALL', image: eventVolleyball, date: 'August 12, 2026', city: 'Kyrenia', taken: 30, capacity: 64, price: 5 },
]

import eventBasketball from '../assets/event-basketball.jpg'
import eventTennis from '../assets/event-tennis.jpg'
import eventCycling from '../assets/event-cycling.jpg'
import eventSwimming from '../assets/event-swimming.png'

const CATEGORY_IMAGES = {
  FOOTBALL: eventFootball,
  MARATHON: eventMarathon,
  RUNNING: eventRunning,
  VOLLEYBALL: eventVolleyball,
  BASKETBALL: eventBasketball,
  TENNIS: eventTennis,
  CYCLING: eventCycling,
  SWIMMING: eventSwimming,
}

export const favouriteEvents = [
  events[0],
  events[1],
  { id: 5, name: 'Keravnos vs AEL Basketball Cup', category: 'BASKETBALL', image: eventBasketball, date: 'August 8, 2026', city: 'Nicosia', taken: 200, capacity: 350, price: 18 },
  { id: 6, name: 'Cyprus Open Tennis Championship', category: 'TENNIS', image: eventTennis, date: 'August 22, 2026', city: 'Kyrenia', taken: 50, capacity: 200, price: 25, memberNote: 'Free for Members' },
  { id: 7, name: 'Mountain Bike Race', category: 'CYCLING', image: eventCycling, date: 'August 20, 2026', city: 'Kyrenia', taken: 241, capacity: 250, price: 35 },
  events[2],
  events[3],
  { id: 8, name: 'Aquatic Cup', category: 'SWIMMING', image: eventSwimming, date: 'Sep 5, 2026', city: 'Nicosia', taken: 20, capacity: 150, price: 20, memberNote: 'Free for Members' },
]

export const myEvents = [
  { id: 1, name: 'APOEL vs Omonai Derby', date: 'August 3, 2026', city: 'Nicosia', status: 'REGISTERED' },
  { id: 2, name: 'Famagusta International Marathon', date: 'August 15, 2026', city: 'Famagusta', status: 'REGISTERED' },
  { id: 3, name: 'Cablenet Run', date: 'October 11, 2026', city: 'Famagusta', status: 'REGISTERED' },
  { id: 4, name: 'Beach Volleyball Cyprus', date: 'August 12, 2026', city: 'Kyrenia', status: 'REGISTERED' },
  { id: 5, name: 'Mountain Bike Race', date: 'September 2, 2026', city: 'Troodos', status: 'REGISTERED' },
]

export const attendedEvents = [
  { id: 1, name: 'APOEL vs Omonai Derby', date: 'August 3, 2026', city: 'Nicosia', rating: 0, review: null },
  { id: 2, name: 'Famagusta International Marathon', date: 'August 15, 2026', city: 'Famagusta', rating: 0, review: '"Great event, had so much fun!"' },
  { id: 3, name: 'Cablenet Run', date: 'October 11, 2026', city: 'Famagusta', rating: 0, review: null, hasReview: true },
]

export const memberships = [
  { id: 1, name: 'Famagusta Athletic Union', type: 'Association', fee: '€12/month', expires: 'expires in 5 days', urgent: true },
  { id: 2, name: 'Cyprus Tennis Club', type: 'Club', fee: '€20/month', expires: 'expires in 18 days', urgent: false },
]

export const conversations = [
  {
    id: 1,
    name: 'Cyprus Tennis Federation',
    preview: 'The registration for doubles category is now open. You can regi...',
    time: '1 day ago',
    unread: 1,
    online: true,
    messages: [
      { id: 1, me: true, text: 'Hi, I wanted to ask about the doubles category registration.', time: '1 day ago' },
      { id: 2, me: false, text: 'Hello Deniz! Yes, the doubles category is now open. You can register with a partner or we can assign one.', time: '1 day ago' },
      { id: 3, me: true, text: 'Great, I have a partner already. How do we register together?', time: '1 day ago' },
      { id: 4, me: false, text: 'The registration for doubles category is now open. Please confirm your partner by sending their name and email to us directly.', time: '1 day ago' },
    ],
  },
  {
    id: 2,
    name: 'Famagusta Athletic Union',
    preview: 'Thank you',
    time: '3 days ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, me: true, text: 'Hello, is my membership renewal processed?', time: '3 days ago' },
      { id: 2, me: false, text: 'Yes, all done. See you at the next event!', time: '3 days ago' },
      { id: 3, me: true, text: 'Thank you', time: '3 days ago' },
    ],
  },
]

export const agentConversations = [
  {
    id: 1,
    name: 'Sıla İl',
    preview: 'The registration for doubles category is now open. You can regi...',
    time: '1 day ago',
    unread: 0,
    online: true,
    messages: [
      { id: 1, me: false, text: "Hi, I won't be able to attend the Aquatic Cup but I think there has been an issue related to the system. Since i am unable to could you please remove me from the participants list manually?", time: '1 day ago' },
      { id: 2, me: true, text: 'Hello Sıla! We are sorry to hear that you wont attend to our event. I have successfully removed you from our participation list but, we hope we meet in future events!', time: '1 day ago' },
      { id: 3, me: false, text: 'Thank you', time: '1 day ago' },
    ],
  },
  {
    id: 2,
    name: 'Deniz Kızılbora',
    preview: 'Thank you',
    time: '3 days ago',
    unread: 1,
    online: false,
    messages: [
      { id: 1, me: false, text: 'Hello, is my membership renewal processed?', time: '3 days ago' },
      { id: 2, me: true, text: 'Yes, all done. See you at the next event!', time: '3 days ago' },
      { id: 3, me: false, text: 'Thank you', time: '3 days ago' },
    ],
  },
]

export const agentNotifications = [
  { id: 1, text: 'You have 10+ unopened messages', time: '1 hour ago', dot: 'blue' },
  { id: 2, text: 'Reminder: 1 day left until APOEL vs Omonai Derby', time: '2 days ago', dot: 'blue' },
  { id: 3, text: 'Warning: Cablenet Run event has been cancelled by an admin', time: '2 days ago', dot: 'red' },
  { id: 4, text: 'Remainder: Your agent membership is almost expired', time: '2 days ago', dot: 'read' },
  { id: 5, text: 'Notice: Your new agent membership commission rate has been modified', time: '3 days ago', dot: 'read' },
  { id: 6, text: 'New message from admin', time: '4 days ago', dot: 'read' },
  { id: 7, text: 'Full quota: APOEL vs Omonai Derby  is now full', time: '4 days ago', dot: 'read' },
  { id: 8, text: 'You have 10+ pending requests for Beach Volleyball Cyprus', time: '5 days ago', dot: 'read' },
  { id: 9, text: 'Event Created: Beach Volleyball Cyprus has been created successfully', time: '1 week ago', dot: 'read' },
  { id: 10, text: 'System Update: Message bug fixed', time: '1 week ago', dot: 'read' },
  { id: 11, text: 'WELCOME! Your agent membership has been approved', time: '1 year ago', dot: 'blue' },
]

// dot: 'blue' = okunmamış, 'red' = önemli/uyarı, 'read' = okunmuş
export const notifications = [
  { id: 1, text: 'Your registiration for Cablenet Run has been confirmed.', time: '1 hour ago', dot: 'blue' },
  { id: 2, text: 'Reminder: 1 day left until APOEL vs Omonai Derby', time: '2 days ago', dot: 'blue' },
  { id: 3, text: 'Payment of €5.00 completed for Beach Volleyball Cyprus.', time: '2 days ago', dot: 'read' },
  { id: 4, text: 'Refund: Your payment for Beach Volleyball Cyprus has been fully refunded successfully', time: '2 days ago', dot: 'blue' },
  { id: 5, text: "The quota for Beach Volleyball Cyprus is almost full. Don't miss out!", time: '2 days ago', dot: 'read' },
  { id: 6, text: 'Membership expiriy: Your membership for Famagusta Athletic Union has expired.', time: '3 days ago', dot: 'red' },
  { id: 7, text: 'Event Cancellation: Beach Volleyball Cyprus  has been CANCELLED! click to get further information..', time: '4 days ago', dot: 'red' },
  { id: 8, text: 'Membership expiriy: Your membership for Famagusta Athletic Union is about to expire. 1 day left.', time: '4 days ago', dot: 'read' },
  { id: 9, text: 'Event Update: The agent has updated the Beach Volleyball Cyprus, check out the changes', time: '5 days ago', dot: 'read' },
  { id: 10, text: 'Registered to Beach Volleyball Cyprus successfully', time: '1 week ago', dot: 'read' },
  { id: 11, text: 'System Update: Message bug fixed', time: '1 week ago', dot: 'read' },
  { id: 12, text: 'Acceptance: Your membership for Cyprus Tennis Federation has been confirmed', time: '1 week ago', dot: 'read' },
]

export const transactions = [
  { id: 1, date: 'July 18, 2026', type: 'Event', to: 'Beach Volleyball Cyprus', amount: '€5.00', status: 'PENDING' },
  { id: 2, date: 'July 10, 2026', type: 'Membership', to: 'Cyprus Tennis Federation', amount: '€20.00', status: 'COMPLETED' },
  { id: 3, date: 'July 10, 2026', type: 'Event', to: 'Famagusta International Marathon', amount: '€45.00', status: 'COMPLETED' },
  { id: 4, date: 'July 8, 2026', type: 'Membership', to: 'Famagusta Athletic Union', amount: '€12.00', status: 'COMPLETED' },
  { id: 5, date: 'July 5, 2026', type: 'Event', to: 'Mountain Bike Race', amount: '€35.00', status: 'FAILED' },
  { id: 6, date: 'July 3, 2026', type: 'Event Refund', to: 'APOEL vs Omonai Derby', amount: '€25.00', status: 'COMPLETED' },
  { id: 7, date: 'July 1, 2026', type: 'Event', to: 'APOEL vs Omonai Derby', amount: '€25.00', status: 'COMPLETED' },
]
