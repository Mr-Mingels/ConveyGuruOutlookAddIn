<script>
import { ref, computed } from 'vue';
import EmailModal from '@/components/EmailModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '../utils/dateUtil.js'

export default {
    name: 'InboxFoldersPage',
    setup() {
        const route = useRoute();
        const router = useRouter();

        const filterDropDown = ref(false)
        const newMessages = ref(JSON.parse(route.query.messages));
        const folders = JSON.parse(route.query.folders);

        console.log("NEW MESSAGES: ", newMessages.value)
        console.log("SELECTED FOLDERS:", folders)

        let headerTitle = ref('All Mail')

        const selectedEmail = ref(null);

        const showModal = (index) => {
            if (filterDropDown.value === true) {
                toggleFilterDropDown()
            }
            selectedEmail.value = newMessages.value[index];
            console.log("SELECTED EMAIL:",selectedEmail)
        };

        const closeModal = () => {
            if (filterDropDown.value === true) {
                toggleFilterDropDown()
            }
            selectedEmail.value = null;
        };

        const handleBackbtn = () => {
            router.push('/inbox-folders')
        }

        const toggleFilterDropDown = () => {
            filterDropDown.value = !filterDropDown.value
        } 

        const filterMessagesByFolder = (folder) => {
            if (folder === 'All Mail') {
                newMessages.value = JSON.parse(route.query.messages);
                console.log("ALL MAIL FILTER NEW MESSAGES:", newMessages)
                headerTitle.value = 'All Mail';
            } else {
                newMessages.value = JSON.parse(route.query.messages).filter(message => message.folder === folder);
                console.log("OTHER FOLDER FILTER NEW MESSAGES:", newMessages)
                headerTitle.value = folder === 'Outbox' ? 'In progress' : folder === 'Sent Items' ? 'Sent' : folder;
            }
            toggleFilterDropDown();
        };

        return {
            showModal,
            selectedEmail,
            closeModal,
            newMessages,
            handleBackbtn,
            filterDropDown,
            toggleFilterDropDown,
            folders,
            filterMessagesByFolder,
            headerTitle
        };
    },
    methods: {
        formatDate
    },
    components: {
        EmailModal,
    },
    mounted() {
        document.body.style.overflow = 'auto'; // Ensure scroll is enabled by default
    },
    watch: {
        selectedEmail(newVal) {
            if (newVal !== null) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }
};
</script>

<template>
    <div class="emailsWrapper">
        <div class="emailsContent">
            <div class='headerWrapper'>
                <h2 class="headerTitle">{{ headerTitle }}</h2>
                <button class="filterBtn" @click="toggleFilterDropDown">Filter
                    <i v-if="!filterDropDown" class="fas fa-chevron-down filterBtnIcon"></i>
                    <i v-else class="fas fa-chevron-up filterBtnIcon"></i>
                </button>
                <div v-if="filterDropDown" class="filterDropDownWrapper">
                    <span class="dropDownItem" @click="filterMessagesByFolder('All Mail')">All Mail</span>
                    <span v-for="(folder, index) in folders" :key="index" class="dropDownItem"
                        @click="filterMessagesByFolder(folder)">
                        {{ folder === 'Outbox' ? 'In progress' : folder === 'Sent Items' ? 'Sent' : folder }}
                    </span>
                </div>
            </div>
            <div class="emailsContainersWrapper scrollable-div">
                <div v-if="newMessages && newMessages.length > 0" v-for="(email, index) in newMessages" :key="index"
                    class="emailContainer" @click="showModal(index)">
                    <div class="emailInfoWrapper">
                        <span class="emailFromTxt">{{ email.sender.name ? email.sender.name : 'NaN' }}</span>
                        <span class="emailSubjectTxt">{{ email.subject ? email.subject : 'NaN' }}</span>
                    </div>
                    <span class="emailDate">{{ formatDate(email.receivedDateTime) }}</span>
                </div>
                <div v-else>
                    <div class="noEmailsFoundWrapper">
                        <p class="noEmailsFoundTxt">
                            No Emails Found
                        </p>
                    </div>
                </div>
            </div>
            <button class="backBtn" @click="handleBackbtn">Back</button>
        </div>
        <EmailModal v-if="selectedEmail !== null && newMessages !== null" :sender="selectedEmail.sender"
            :emailText="selectedEmail.emailText" :toRecipients="selectedEmail.toRecipients" 
            :date="selectedEmail.receivedDateTime" :closeModal="closeModal" />
    </div>
</template>



<style>
.emailsWrapper {
    display: flex;
    justify-content: center;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    height: 100vh;
    background-color: #ffffff;
    min-height: 742px;
}

.emailsContent {
    padding-bottom: 1.5rem;
    padding-top: 2.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.headerWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #1b1b1b;
    align-items: center;
    margin-bottom: 24px;
    position: relative;
}

.headerTitle {
    color: #1b1b1b;
    font-size: 28px;
    text-align: end;
    padding-left: 4px;
    margin-block-start: unset;
    margin-block-end: unset;
}

.filterBtn {
    width: 96px;
    border: 1px solid #1b1b1b;
    border-radius: 4px;
    height: 34px;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s ease-in-out;
    background-color: transparent;
    margin-bottom: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.filterBtn:hover {
    background-color: #ff814f;
    color: white;
    border-color: #ff814f;
}

.filterDropDownWrapper {
    position: absolute;
    top: 42px;
    right: 0;
    background-color: white;
    z-index: 999;
    border: 1px solid #1b1b1b;
    border-radius: 4px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 150px;
}

.dropDownItem {
    font-size: 14px;
    padding: 6px;
    width: 100%;
    color: #1b1b1b;
    cursor: pointer;
    border-radius: 4px;
}

.dropDownItem:hover {
    background-color: #ff814f;
    color: white;
}

.emailsContainersWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.emailContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #4a5261;
    font-size: 15px;
    position: relative;
    cursor: pointer;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #dadadada;
}

.emailContainer:hover {
    background-color: rgba(255, 129, 79, 0.1);
}

.emailInfoWrapper {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
}

.emailFromTxt,
.emailSubjectTxt {
    overflow: hidden;
    text-overflow: ellipsis;
}

.emailFromTxt {
    color: #ff5e20;
}

.emailSubjectTxt {
    color: #1b1b1b;
}

.emailDate {
    color: #1b1b1b;
    padding: 16px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 13px;

}

.noEmailsFoundWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 500px;
}

.noEmailsFoundTxt {
    font-size: 24px;
    color: #1b1b1b;
    font-weight: 600;
}

.backBtn {
    border-radius: 0.75rem;
    width: 100%;
    color: #ffffff;
    max-width: 500px;
    background: #ff5e20;
    font-size: 17px;
    min-height: 46px;
    margin-top: auto;
    border: 1px solid #ff5e20;
    cursor: pointer;
}

@media (max-width: 500px) {
    .emailsWrapper {
        padding-left: 12px;
        padding-right: 12px;
    }
}
</style>