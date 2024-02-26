<script>
import { ref } from 'vue';
import { emailMessages, emailFolders } from '../taskpane/taskpane.js'
import { useRouter } from 'vue-router';

export default {
    name: 'InboxFoldersPage',
    setup() {
        const router = useRouter();
        const loading = ref(false)

        const folders = ref([
            { name: 'Inbox', checked: false, folderDisplayName: "Inbox" },
            { name: 'Archive', checked: false, folderDisplayName: "Archive" },
            { name: 'In progress', checked: false, folderDisplayName: "Outbox" },
            { name: 'Sent', checked: false, folderDisplayName: "Sent Items" },
            { name: 'Junk Email', checked: false, folderDisplayName: "Junk Email" },
            { name: 'Deleted Items', checked: false, folderDisplayName: "Deleted Items" },
            { name: 'Drafts', checked: false, folderDisplayName: "Drafts" },
        ]);

        const selectAll = () => {
            for (const folder of folders.value) {
                folder.checked = true;
            }
        };

        const toggleFolder = (index) => {
            folders.value[index].checked = !folders.value[index].checked;
        };

        const filterMessages = () => {
            const checkedFolders = folders.value.filter(folder => folder.checked).map(folder => folder.folderDisplayName);

            const folderIds = checkedFolders.map(folderName => {
                const folder = emailFolders.find(folder => folder.displayName === folderName);
                return folder ? folder.id : null;
            });

            return emailMessages.filter(message => {
                return folderIds.includes(message.parentFolderId);
            }).map(message => {
                const folder = emailFolders.find(folder => folder.id === message.parentFolderId);
                return {
                    sender: message.sender && message.sender.emailAddress ? message.sender.emailAddress : "NaN",
                    toRecipients: message.toRecipients ? message.toRecipients : "NaN",
                    receivedDateTime: message.receivedDateTime,
                    emailText: message.bodyPreview ? message.bodyPreview : "No text provided. It must be an email draft, or there was simply no text provided.",
                    subject: message.subject ? message.subject : "NaN",
                    folder: folder.displayName
                };
            });
        }

        const confirmFolderMessages = () => {
            loading.value = true

            const newMessages = filterMessages()

            const selectedFolders = folders.value
                .filter(folder => folder.checked)
                .map(folder => folder.folderDisplayName);

            router.push({ path: '/emails', query: { messages: JSON.stringify(newMessages), folders: JSON.stringify(selectedFolders) } });
        }

        return {
            folders,
            selectAll,
            toggleFolder,
            filterMessages,
            loading,
            confirmFolderMessages
        };
    }
};

</script>


<template>
    <div class="inboxFoldersWrapper">
        <div class="inboxFoldersContent">
            <h2 class="inboxFoldersHeaderTxt">
                Select the folder you would like to connect
            </h2>
            <div class='selectAllWrapper'>
                <span class="selectAllBtn" @click="selectAll">Select all</span>
            </div>
            <div class="inboxFoldersContainersWrapper">
                <div v-for="(folder, index) in folders" :key="index" class="inboxFoldersContainer">
                    <span>
                        {{ folder.name }}
                    </span>
                    <label class="checkBoxWrapper">
                        <input type="checkbox" style="display: none;" :checked="folder.checked"
                            @click="toggleFolder(index)" />
                        <span class="checkBox"
                            :class="{ 'checkBoxChecked': folder.checked, 'checkBoxUnchecked': !folder.checked }">
                            <svg class="checkBoxSvg" viewBox="0 0 24 24" v-if="folder.checked">
                                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                        </span>
                    </label>
                </div>
            </div>
            <button class="confirmBtn" @click="confirmFolderMessages">
                Confirm
            </button>
        </div>
        <div v-if="loading" class="loaderWrapper"><span class="loader"></span></div>
    </div>
</template>

<style>
.inboxFoldersWrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    min-height: 742px;
}

.inboxFoldersContent {
    display: flex;
    padding-bottom: 1.5rem;
    padding-top: 2.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-weight: 600;
    max-width: 500px;
}

.inboxFoldersHeaderTxt {
    width: 100%;
    font-size: 1.5rem;
    line-height: 2rem;
    color: #1d222b;
    margin-block-start: unset;
    margin-block-end: unset;
}

.selectAllWrapper {
    display: flex;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e6e8ec;
    margin-top: 1.25rem;
    justify-content: flex-end;
    width: 100%;
    user-select: none;

}

.selectAllBtn {
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    color: #ff6429;
}

.inboxFoldersContainersWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.inboxFoldersContainer {
    display: flex;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #4a5261;
    font-size: 15px;
    border-bottom: 1px solid #e6e8ec;
}

.checkBoxWrapper {
    display: flex;
    margin-left: 0.5rem;
    align-items: center;
    cursor: pointer;
}

.checkBox {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    border: 1px solid;
    width: 1.25rem;
    height: 1.25rem;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 300ms;
}

.checkBoxChecked {
    background: #ff6429;
    border-color: #ff6429;
}

.checkBoxUnchecked {
    border-color: #9CA3AF;
}

.checkBoxSvg {
    width: 1rem;
    height: 1rem;
    color: #ffffff;
    pointer-events: none;
}

.confirmBtn {
    border-radius: 0.75rem;
    width: 100%;
    color: #ffffff;
    max-width: 500px;
    background: #ff5e20;
    font-size: 17px;
    min-height: 46px;
    border: 1px solid #ff5e20;
    cursor: pointer;
    margin-top: auto;
}
</style>
