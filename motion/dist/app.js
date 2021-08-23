import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
import { VideoComponent } from './components/page/item/video.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        this.page.addChild(image);
        const note = new NoteComponent('Note Title', 'Note body');
        this.page.addChild(note);
        const todo = new TodoComponent('Todo Title', 'Todo Item');
        this.page.addChild(todo);
        const video = new VideoComponent('Vidoe Title', 'https://youtu.be/8AqRRtUA7ko');
        this.page.addChild(video);
    }
}
new App(document.querySelector('.document'));
