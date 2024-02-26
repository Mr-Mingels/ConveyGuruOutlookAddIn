<script>
import { formatDate } from '../utils/dateUtil.js'

export default {
    name: 'EmailModal',
    props: {
        sender: Object,
        date: String,
        toRecipients: Array,
        emailText: String,
        closeModal: Function
    },
    methods: {
        formatDate
    }
}
</script>

<template>
    <div class="emailModalWrapper">
        <div class="emailModalContent">
            <div class="emailModalInfoWrapper">
                <div class="emailModalTxtWrapper">
                    <span class="emailModalSenderTxt">From: <span class="emailModalSenderName">{{ sender.name ? sender.name
                        : "NaN" }} <span class="sendersEmail" v-if="sender.address">
                                &lt;{{ sender.address }}>
                            </span></span></span>
                    <span class="emailModalToTxt">To:
                        <span v-if="toRecipients && toRecipients.length > 0" v-for="(recipient, index) in toRecipients"
                            :key="index">
                            {{ recipient.emailAddress.name }} <span class="recipientsEmail">&lt;{{
                                recipient.emailAddress.address }}>
                            </span>{{ index < toRecipients.length - 1 ? ', ' : '' }} </span>
                                <span v-else class="recipientsEmail">
                                    NaN
                                </span>
                        </span>
                </div>
                <span class="emailModalDateTxt">{{ formatDate(date) }}</span>
            </div>
            <textarea class="emailModalTxtArea" readonly="true">{{ emailText }}</textarea>
            <button class="emailModalCloseBtn" @click="closeModal()">Close</button>
        </div>
    </div>
</template>
  

<style>
.emailModalWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    padding: 16px;
}

.emailModalContent {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #1b1b1b;
    max-width: 500px;
    width: 100%;
    padding: 16px;
    gap: 16px;
}

.emailModalInfoWrapper {
    display: flex;
    gap: 12px;
    white-space: nowrap;
    overflow: hidden;
    justify-content: space-between;
}

.emailModalTxtWrapper {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
}

.emailModalSenderTxt,
.emailModalToTxt {
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1b1b1b;
}

.recipientsEmail,
.sendersEmail {
    color: #ff5e20;
}

.emailModalDateTxt {
    color: #1b1b1b;
    font-size: 13px;
    height: 100%;
}

.emailModalTxtArea {
    border: 1px solid #1b1b1b;
    border-radius: 8px;
    resize: none;
    outline: none;
    min-height: 124px;
    padding: 4px;
    padding-left: 8px;
    padding-right: 8px;
}

.emailModalCloseBtn {
    width: 100%;
    background-color: #ff5e20;
    border-radius: 8px;
    height: 36px;
    color: white;
    border: 1px solid #ff5e20;
    cursor: pointer;
}
</style>