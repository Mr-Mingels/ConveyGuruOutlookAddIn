<script>
import { run } from '../taskpane/taskpane.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'WelcomePage',
    setup() {
        const router = useRouter();

        const handleLogIn = () => {
            run((success) => {
                if (success) {
                    router.push('/inbox-folders');
                }
            });
        };

        const handleSignUp = () => {
            window.location.href = 'https://signup.live.com/?lic=1';
        };

        return {
            handleLogIn,
            handleSignUp,
        };
    }
};
</script>


<template>
    <div class="welcomePageWrapper">
        <div class="welcomePageContent">
            <div class="welcomePageIntroHeaderWrapper">
                <div class="welcomePageImgTitleWrapper">
                    <img src="@/assets/conveyguruicon.png" alt="Convey Guru Icon" class="welcomePageIconImg">
                    <h2 class="welcomePageTitle">Convey Guru</h2>
                </div>
                <p class="welcomePageIntrotxt">Where conveyancing specialists and solicitors can focus on their
                    work without constant interruptions</p>
            </div>
            <div class="welcomePageFooterWrapper">
                <button class="welcomePageMainBtn" @click="handleLogIn">
                    Try now
                </button>
                <p class="welcomeAuthTxt">Don't have an account? <span class="welcomePageSignUpTxt"
                        @click="handleSignUp">Sign up now</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
.welcomePageWrapper {
    display: flex;
    padding-bottom: 40px;
    padding-top: 80px;
    justify-content: center;
    width: 100%;
    height: 100vh;
    font-weight: 600;
    color: #ffffff;
    min-height: 620px;
    background: linear-gradient(to bottom right, #ff5e20 30%, hsl(24, 100%, 58%) 70%);
}

.welcomePageContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 336px;
    padding-left: 32px;
    padding-right: 32px;
}

.welcomePageIntroHeaderWrapper {
    display: flex;
    flex-direction: column;
    gap: 44px;
    align-items: center;
}

.welcomePageImgTitleWrapper {
    display: flex;
    gap: 16px;
    align-items: end;
}

.welcomePageIconImg {
    width: 40px;
    height: 44px;
}

.welcomePageTitle {
    margin-bottom: 4px;
    font-size: 30px;
    line-height: 36px;
    margin-block-start: unset;
    margin-block-end: unset;
    margin-inline-start: unset;
    margin-inline-end: unset;
}

.welcomePageIntrotxt {
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    margin-block-start: unset;
    margin-block-end: unset;
}

.welcomePageFooterWrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    width: 100%;
}

.welcomePageMainBtnWrapper {
    width: 100%;
}

.welcomePageMainBtn {
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    color: #ff5e20;
    border-radius: 24px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.welcomeAuthTxt {
    font-weight: 500;
}

.welcomePageSignUpTxt {
    font-weight: 600;
    cursor: pointer;
}

@media (max-width: 400px) {
    .welcomePageContent {
        padding-left: 24px;
        padding-right: 24px;
    }
}
</style>
