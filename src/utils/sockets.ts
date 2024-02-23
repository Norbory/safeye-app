import io from 'socket.io-client';

const socket = io();

export const loadnotes = (callback: (...args: any[]) => void) => {
    socket.on('server:loadnotes', callback);
};

export const saveNote = (title: string, description: string) => {
    socket.emit('client:newnote',{
        title,
        description
    })
};

export const onNewNote = (callback: (...args: any[]) => void) => {
    socket.on('server:newnote', callback);
};

export const deleteNote = (id:string) => {
    socket.emit('client:deletenote', id);
};

export const getNote = (id: string) => {
    socket.emit('client:getnote', id);
};

export const onSelectedNote = (callback: (...args: any[]) => void) => {
    socket.on('server:selectednote', callback);
};

export const updateNote = (id: string, title: string, description: string) => {
    socket.emit('client:updatenote', {
        _id: id,
        title,
        description
    });
};