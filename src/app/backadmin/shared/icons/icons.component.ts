import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent {
  @Input()
  set icon(value: any) {
    switch (value) {
      case 'home':
        this._icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" viewBox="0 0 24 24"><path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg>'
        break;
      case 'users':
        this._icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-muted-400 h-5 w-5" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M136 108a52 52 0 1 1-52-52a52 52 0 0 1 52 52Z" opacity=".2"></path><path d="M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07Z"></path></g></svg>'
        break;
      case 'options':
        this._icon = '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-muted-400 h-5 w-5" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M208 56v144a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8Z" opacity=".2"></path><path d="M200 40H56a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 80h-64V56h64Zm-80-64v64H56V56Zm-64 80h64v64H56Zm144 64h-64v-64h64v64Z"></path></g></svg>'
        break;
      case 'holding':
        this._icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M232 96H24l104-64Z" opacity=".2"></path><path d="M24 104h24v64H32a8 8 0 0 0 0 16h192a8 8 0 0 0 0-16h-16v-64h24a8 8 0 0 0 4.19-14.81l-104-64a8 8 0 0 0-8.38 0l-104 64A8 8 0 0 0 24 104Zm40 0h32v64H64Zm80 0v64h-32v-64Zm48 64h-32v-64h32ZM128 41.39L203.74 88H52.26ZM248 208a8 8 0 0 1-8 8H16a8 8 0 0 1 0-16h224a8 8 0 0 1 8 8Z"></path></g></svg>'
        break;
      case 'promo':
        this._icon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 9H9.01M15 15H15.01M16 8L8 16M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9ZM15.5 15C15.5 15.2761 15.2761 15.5 15 15.5C14.7239 15.5 14.5 15.2761 14.5 15C14.5 14.7239 14.7239 14.5 15 14.5C15.2761 14.5 15.5 14.7239 15.5 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
        break;
      case 'upload':
        this._icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 mb-2 h-10 w-10 transition-colors duration-300" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 20A5.5 5.5 0 0 1 0 14.5A5.5 5.5 0 0 1 5.5 9c1-2.35 3.3-4 6-4c3.43 0 6.24 2.66 6.5 6.03l.5-.03c2.5 0 4.5 2 4.5 4.5S21 20 18.5 20h-13m0-10C3 10 1 12 1 14.5S3 19 5.5 19h13a3.5 3.5 0 0 0 3.5-3.5a3.5 3.5 0 0 0-3.5-3.5c-.56 0-1.1.13-1.57.37l.07-.87A5.5 5.5 0 0 0 11.5 6a5.51 5.51 0 0 0-5.31 4.05L5.5 10m6.5 7v-5.25L14.25 14l.75-.66l-3.5-3.5l-3.5 3.5l.75.66L11 11.75V17h1Z"></path></svg>'
        break;
      case 'subscribe':
        this._icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  width="1em" height="1em" viewBox="0 0 24 24"><path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z"></path></svg>'
        break;
      case 'enchere':
        this._icon = '<svg data-v-26e5b7b0="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon h-5 w-5" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M96 37.5v72l-62.4 36A96 96 0 0 1 96 37.5Z" opacity=".2"></path><path d="M100 116.43a8 8 0 0 0 4-6.93v-72A8 8 0 0 0 93.34 30a104.06 104.06 0 0 0-67.61 117a8 8 0 0 0 4.52 5.81a7.86 7.86 0 0 0 3.35.74a8 8 0 0 0 4-1.07ZM88 49.62v55.26l-47.88 27.63C40 131 40 129.48 40 128a88.12 88.12 0 0 1 48-78.38Zm130.34 26.9c-.09-.18-.18-.37-.29-.55s-.2-.33-.31-.49A104.05 104.05 0 0 0 128 24a8 8 0 0 0-8 8v91.83l-78.81 45.9a8 8 0 0 0-2.87 11A104 104 0 0 0 232 128a103.34 103.34 0 0 0-13.66-51.48ZM136 40.36a88.05 88.05 0 0 1 63.89 36.94L136 114.51ZM128 216a88.45 88.45 0 0 1-71.49-36.68l75.4-43.91l.22-.14l75.77-44.13A88 88 0 0 1 128 216Z"></path></g></svg>'
        break;
      case 'stock':
        this._icon = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M77.4,78.1H40.5c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h36.9
	      c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C79.8,77,78.8,78.1,77.4,78.1C77.5,78.1,77.5,78.1,77.4,78.1z"/><path d="M26.6,78.1H22c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h4.6c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C29,77,28,78,26.8,78.1C26.7,78.1,26.7,78.1,26.6,78.1z"/>
        <path d="M53.8,57.6c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h23.6c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H53.8z"/><path d="M62.6,37.1c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h14.8
	      c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H62.6z"/><path d="M20.8,58.2C19.6,47.5,28,36.4,38,34.5l2.7-0.6c0.5-0.1,0.9-0.6,0.8-1.2c0-0.3-0.2-0.5-0.4-0.6l-6.7-4.5
	      c-0.7-0.5-0.8-1.4-0.3-2c0,0,0,0,0-0.1l1.7-2.5c0.4-0.7,1.4-0.9,2-0.4c0,0,0,0,0.1,0L54,33.5c0.7,0.4,0.9,1.4,0.4,2c0,0,0,0,0,0.1l-11,16.2c-0.4,0.7-1.4,0.9-2,0.4c0,0,0,0-0.1,0l-2.5-1.7c-0.7-0.4-0.9-1.4-0.4-2c0,0,0,0,0-0.1l4.4-6.7c0.3-0.4,0.3-1.1-0.2-1.4
	      c-0.2-0.2-0.5-0.3-0.8-0.2l-1.6,0.3c-7.8,1.5-14.4,10.3-13.7,17.9c0,0.7-1.1,1.7-1.9,1.9h-1.9C21.8,60.3,20.8,59.1,20.8,58.2z"/></svg>`
        break;
      case 'request':
        this._icon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 122.879 102.401" enable-background="new 0 0 122.879 102.401" xml:space="preserve"><g><path d="M46.736,0H30.311H16.698C12.083,0,8.144,1.619,4.881,4.881C1.619,8.144,0,12.083,0,16.698v29.313 c0,4.639,1.619,8.579,4.881,11.841c3.262,3.238,7.202,4.882,11.817,4.882c4.301,0,8.603,0,12.904,0 c-0.942,3.673-2.15,7.178-3.624,10.463c-1.45,3.311-3.891,6.477-7.298,9.497c6.525-1.691,12.325-4.229,17.423-7.587 c5.099-3.335,9.497-7.468,13.17-12.373c3.691,0,7.384,0,11.075,0c4.615,0,8.554-1.644,11.816-4.882 c3.264-3.262,4.883-7.202,4.883-11.841V16.698c0-4.615-1.619-8.555-4.883-11.817C68.902,1.619,64.963,0,60.348,0H46.736L46.736,0z M122.879,33.663v29.313c0,2.667-0.475,5.159-1.432,7.479c-0.953,2.314-2.375,4.416-4.266,6.308 c-0.822,0.814-1.684,1.545-2.584,2.188c-0.928,0.66-1.873,1.221-2.84,1.681c-0.051,0.024-0.104,0.047-0.156,0.068 c-1.236,0.575-2.525,1.009-3.863,1.299c-1.389,0.302-2.824,0.453-4.311,0.453h-8.734h-0.018h-0.018h-0.018h-0.016h-0.467 c0.186,0.59,0.379,1.175,0.578,1.755c0.568,1.639,1.207,3.253,1.918,4.837l0.01,0.021h0.002c0.641,1.463,1.496,2.89,2.564,4.279 c1.102,1.434,2.447,2.854,4.033,4.261c1.135,1.004,1.24,2.737,0.238,3.871c-0.707,0.799-1.777,1.088-2.742,0.838l-0.002,0.001 c-3.406-0.884-6.625-1.987-9.654-3.309c-3.031-1.321-5.891-2.87-8.58-4.642l-0.006,0.008c-2.672-1.747-5.172-3.715-7.494-5.897 c-1.969-1.85-3.807-3.857-5.514-6.023h-0.928h-0.016h-0.02h-0.016h-0.018h-8.735c-1.818,0-3.56-0.227-5.223-0.676 c-1.665-0.45-3.251-1.134-4.756-2.048c-1.295-0.784-1.709-2.469-0.925-3.764c0.784-1.295,2.469-1.709,3.764-0.925 c1.031,0.626,2.144,1.102,3.337,1.424c1.186,0.32,2.454,0.482,3.803,0.482h8.735h0.018h0.016h0.02h0.016h2.271v0.011 c0.834,0,1.656,0.379,2.193,1.097c1.732,2.313,3.648,4.456,5.74,6.422c2.066,1.941,4.316,3.708,6.742,5.295l-0.006,0.008 l0.006,0.003c2.305,1.519,4.777,2.865,7.418,4.038c-0.5-0.846-0.938-1.699-1.314-2.561l0,0c-0.752-1.681-1.445-3.438-2.08-5.267 c-0.602-1.738-1.141-3.525-1.617-5.353c-0.105-0.294-0.164-0.61-0.164-0.94c0-1.521,1.232-2.753,2.752-2.753h4.102h0.016h0.018 h0.018h0.018h8.734c1.107,0,2.156-0.108,3.148-0.324c0.943-0.204,1.84-0.503,2.689-0.895c0.041-0.022,0.084-0.044,0.127-0.064 c0.717-0.342,1.393-0.737,2.021-1.186c0.656-0.469,1.289-1.004,1.895-1.606c1.371-1.37,2.391-2.87,3.063-4.501 c0.67-1.624,1.002-3.421,1.002-5.394V33.663c0-1.96-0.332-3.751-1.002-5.373c-0.672-1.628-1.691-3.127-3.063-4.498l0,0l-0.01-0.011 c-1.371-1.371-2.869-2.391-4.498-3.062c-1.621-0.669-3.412-1.002-5.373-1.002h-7.873h-5.738c-1.521,0-2.754-1.233-2.754-2.753 c0-1.521,1.232-2.753,2.754-2.753h5.738h7.873c2.656,0,5.143,0.476,7.459,1.432c2.307,0.952,4.406,2.37,6.295,4.256l0.004,0.005 l0.006,0.005l0.002,0.002c1.887,1.888,3.303,3.986,4.254,6.292C122.404,28.521,122.879,31.008,122.879,33.663L122.879,33.663z"/></g></svg>'
        break;
      case 'maps':
        this._icon = `<svg version="1.1" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
        <g><g><g><path fill="currentColor" d="M121,10.1c-6,0.9-13.8,3.2-18.1,5.2C80.6,25.6,65.6,48.2,63.8,74c-1.3,20.7,9.5,45,38.1,85.2c5.4,7.7,13.5,19,17.8,25.1c4.2,6.1,8,11.1,8.3,11.3c0.3,0.1,1.7-1.5,3.1-3.7c1.4-2.1,7.7-11,14-19.7c31.3-43.2,42.9-64.4,46.5-84.9c1.8-10.4,0-24.7-4.6-35.7c-10.3-24.9-31.6-40.5-56.7-41.4C126.3,9.9,122.1,10,121,10.1z M135.8,42.9c15,4,25.1,19.2,22.6,34c-1.1,6.4-3.6,11.3-8,16c-6.8,7.4-17.4,11.1-26.8,9.5c-16.8-2.8-28.7-18.7-25.9-34.8c2-11.7,11-21.7,22.3-24.8C124,41.7,131.6,41.7,135.8,42.9z"/><path fill="currentColor" d="M50.5,147.8c-0.6,2.1-7.3,24.8-14.8,50.5c-7.5,25.6-13.7,46.8-13.7,47.1S66.3,246,128,246c58.3,0,106.1-0.3,106.1-0.6c0-0.3-6.2-21.5-13.7-47.1c-7.5-25.6-14.2-48.3-14.8-50.5l-1.1-3.8h-16.4h-16.4l-3.4,5c-1.8,2.8-3.4,5.1-3.4,5.3c0,0.2,7.2,0.5,15.9,0.5l15.9,0.2l11.2,38.3c6.2,21,11.5,39.1,11.7,40.1l0.5,1.9H128H35.9l0.5-1.9c0.2-1,5.4-19.1,11.7-40.1L59.3,155l16.2-0.2l16.2-0.1l-3.6-5.4l-3.5-5.4H68.1H51.5L50.5,147.8z"/></g></g></g>
        </svg>`
        break;
      case 'pub':
        this._icon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-muted-400 h-5 w-5" width="24px" height="30px" viewBox="0 0 256 256"><g fill="currentColor"><path d="M208 56v144a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8Z" opacity=".2"></path><path d="M200 40H56a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 80h-64V56h64Zm-80-64v64H56V56Zm-64 80h64v64H56Zm144 64h-64v-64h64v64Z"></path></g></svg>`
        break;
      default:
        this._icon = null
        break;
    }
  }
  get icon() {
    return this._icon
  }
  _icon: any;
}