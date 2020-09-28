import {autorun, decorate, observable, action } from 'mobx';
import InboxData from '../data/inbox.json';
import SpamData from '../data/spam.json';
import DeleteData from '../data/delete.json';
import CustomData from '../data/custom.json';

class Store {
        data= {
            inbox: InboxData,
            spam: SpamData,
            delete: DeleteData,
            custom: CustomData,
        };
        unreadCount= {
            inbox: 0,
            spam: 0,
            delete: 0,
            custom: 0
        };

        selectedMailData= InboxData;
        selectedMail= {};
        selectedFolder= "Inbox";
        flaggedMails= [];
        fliterApplied= false;

    constructor() {
        this.load();
        autorun(this.save);
        this.updateUnreadCount();
    }

    save = () => {
        window.localStorage.setItem(
            'email_store_state',
            JSON.stringify(
                {
                    "data": this.data,
                    "unreadCount": this.unreadCount,
                    "selectedMailData": this.selectedMailData,
                    "selectedMail": this.selectedMail,
                    "selectedFolder": this.selectedFolder,
                    "flaggedMails": this.flaggedMails,
                    "fliterApplied": this.fliterApplied
                }
            )
        )
    }

    load = () => {
        let localStorageData = Object.assign({}, JSON.parse(window.localStorage && window.localStorage.length>0 ? window.localStorage.getItem('email_store_state') || '{}' : '{}'))
        if(localStorageData && Object.keys(localStorageData).length > 0){
            this.data = localStorageData.data;
            this.unreadCount = localStorageData.unreadCount;
            this.selectedMailData= localStorageData.selectedMailData;
            this.selectedMail = localStorageData.selectedMail;
            this.selectedFolder = localStorageData.selectedFolder;
            this.flaggedMails = localStorageData.flaggedMails;
            this.fliterApplied = localStorageData.fliterApplied;
        }
    }

    updateUnreadCount(){
        let folders = Object.keys(this.unreadCount);
        folders.map((folder) => {
            let count = 0;
            this.data[folder].map((mail) => {
                if(mail.unread){
                    count++;
                }
                return count
            })
            this.unreadCount[folder] = count;
            return true;
        });
    }

    setFolder(folderName){
        this.selectedFolder = folderName;
        this.selectedMail = {};
        this.selectedMailData = this.data[folderName];
    }
    
    openMail(item){
        this.selectedMail = Object.assign({}, item);
        let folderData = [...this.data[this.selectedFolder]];
        let index = folderData.findIndex((mail) => mail.mId === item.mId);
        folderData[index] = Object.assign(item, {unread: false});
        this.data[this.selectedFolder] = [...folderData];
        this.unreadCount[this.selectedFolder] = this.getUnreadCount(this.selectedFolder);
    }

    getUnreadCount(folderName){
        let count = 0;
        this.data[folderName].map((mails) => {
            if(mails.unread){
                count++;
            }
            return count;
        });
        return count
    }

    deleteMail(item, e){
        let folderData = [...this.data[this.selectedFolder]];
        let index = folderData.findIndex((mail) => mail.mId === item.mId);
        folderData.splice(index, 1);
        this.selectedMail = Object.assign({},folderData[index]);
        this.data[this.selectedFolder] = [...folderData];
        this.selectedMailData = [...folderData];
        if(this.selectedFolder !== 'delete'){
            this.data.delete.splice(0, 0, item);
        }
        this.updateUnreadCount();
        e.stopPropagation();        
    }

    flagMail(item, e){
        let index = this.flaggedMails.indexOf(item.mId);
        if(index > -1){
            this.flaggedMails.splice(index, 1);
        } else{
            this.flaggedMails.push(item.mId);
        }
        e.stopPropagation();
    }

    filterFlaggedMails(){
        this.selectedMailData = this.selectedMailData.filter((mail) => this.flaggedMails.includes(mail.mId));
        this.fliterApplied = true;
    }

    removeFlaggedFilter(){
        this.selectedMailData = this.data[this.selectedFolder];
        this.fliterApplied = false;
    }
}

decorate(Store, {
    selectedMailData: observable,
    selectedMail:  observable,
    selectedFolder: observable,
    unreadCount: observable,
    flaggedMails: observable,
    fliterApplied: observable,
    data: observable,
    openMail: action,
    setFolder: action,
    getUnreadCount: action,
    deleteMail: action,
    flagMail: action,
    filterFlaggedMails: action,
    removeFlaggedFilter: action
})

const emailStore = new Store();
export default emailStore;