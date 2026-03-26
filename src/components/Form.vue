<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import type { LoginSettings } from '../shared/settings'

import { saveAccountInfo, getAccountInfo } from '../shared/account'

// 表单状态
const username = ref('')
const password = ref('')
const isp = ref('@cmcc')

// 交互反馈状态
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const isSaving = ref(false)

let timeoutId: number | undefined

onMounted(async () => {
    try{
        const account = await getAccountInfo()
        if(!account) return
        username.value = account.username
        password.value = account.password
        isp.value = account.isp
    } catch (error) {
        console.error('加载账户信息失败:', error)
        showMessage('加载账户信息失败', 'error')
    }
})

// 消息提示辅助函数
const showMessage = (msg: string, type: 'success' | 'error') => {
    message.value = msg
    messageType.value = type
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
        message.value = ''
    }, 2500)
}

// 提交表单处理
async function handleSubmit() {
  if (!username.value || !password.value || !isp.value) {
    showMessage('请填写完整信息', 'error')
    return
  }

  isSaving.value = true

  try {
    const settings: LoginSettings = {
      username: username.value,
      password: password.value,
      isp: isp.value,
    }

    console.log('Saving settings:', settings)

    await saveAccountInfo(settings)

    showMessage('保存成功！', 'success')
  } catch (error) {
    console.error('保存失败:', error)
    showMessage('保存失败，请重试', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
    <div class="form-container">

        <div class="banner">
            <div class="banner-bg-circle top-right"></div>
            <div class="banner-bg-circle bottom-left"></div>

            <div class="banner-content">
                <div class="banner-icon-wrapper">
                    <svg class="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0">
                        </path>
                    </svg>
                </div>
                <h1 class="banner-title">Auto Login</h1>
                <p class="banner-subtitle">校园网自动登录配置</p>
            </div>
        </div>

        <div class="form-body">

            <div class="input-group">
                <label for="username">账号 (Username)</label>
                <div class="input-wrapper">
                    <div class="input-icon left">
                        <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <input id="username" v-model="username" type="text" placeholder="请输入账号" />
                </div>
            </div>

            <div class="input-group">
                <label for="password">密码 (Password)</label>
                <div class="input-wrapper">
                    <div class="input-icon left">
                        <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                            </path>
                        </svg>
                    </div>
                    <input id="password" v-model="password" type="password" placeholder="请输入密码" />
                </div>
            </div>

            <div class="input-group">
                <label for="isp">运营商 (ISP)</label>
                <div class="input-wrapper">
                    <div class="input-icon left">
                        <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
                            </path>
                        </svg>
                    </div>
                    <select id="isp" v-model="isp">
                        <option value="" disabled>请选择运营商</option>
                        <option value="@telecom">中国电信 (Telecom)</option>
                        <option value="@cmcc">中国移动 (CMCC)</option>
                        <option value="@unicom">中国联通 (Unicom)</option>
                    </select>
                    <div class="input-icon right">
                        <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="action-group">
                <button class="submit-btn" @click="handleSubmit" :disabled="isSaving">
                    <svg v-if="isSaving" class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="spinner-head" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    {{ isSaving ? '保存中...' : '保存配置' }}
                </button>

                <transition name="msg-fade">
                    <div v-if="message" :class="['message-box', messageType]">
                        {{ message }}
                    </div>
                </transition>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* 基础变量设置，使用天蓝色系 */
.form-container {
    --color-primary: #0ea5e9;
    box-sizing: border-box;
    width: 100%;

    background-color: #ffffff;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: var(--color-text-main);
}

.form-container * {
    box-sizing: border-box;
}

/* 顶部 Banner */
.banner {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    padding: 32px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.banner-bg-circle {
    position: absolute;
    width: 128px;
    height: 128px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(24px);
}

.banner-bg-circle.top-right {
    top: -40px;
    right: -40px;
}

.banner-bg-circle.bottom-left {
    bottom: -40px;
    left: -40px;
}

.banner-content {
    position: relative;
    z-index: 10;
}

.banner-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 12px;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(4px);
}

.banner-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.5px;
}

.banner-subtitle {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #e0f2fe;
    opacity: 0.9;
}

/* 表单主体 */
.form-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    pointer-events: none;
    color: #94a3b8;
}

.input-icon.left {
    left: 0;
    padding-left: 12px;
}

.input-icon.right {
    right: 0;
    padding-right: 12px;
}

.icon-lg {
    width: 28px;
    height: 28px;
    color: #ffffff;
}

.icon-sm {
    width: 20px;
    height: 20px;
}

.icon-xs {
    width: 16px;
    height: 16px;
}

input,
select {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--color-bg-input);
    color: var(--color-text-main);
    transition: all 0.2s ease-in-out;
    outline: none;
}

select {
    padding-right: 40px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
}

input:focus,
select:focus {
    background-color: #ffffff;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

input::placeholder {
    color: #94a3b8;
}

/* 按钮区域 */
.action-group {
    padding-top: 8px;
}

.submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary);
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2), 0 2px 4px -1px rgba(14, 165, 233, 0.1);
}

.submit-btn:hover:not(:disabled) {
    /* 悬停状态 */
    background-color: #004f73;
    color: #ffffff !important;
}

.submit-btn:active:not(:disabled) {
    /* 点击状态 */
    transform: scale(0.96);
}

.submit-btn:focus {
    /* 获得焦点时 */
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light), 0 4px 6px -1px rgba(14, 165, 233, 0.2);
}

.submit-btn:disabled {
    /* 禁用状态 */
    opacity: 0.7;
    cursor: not-allowed;
}

/* Loading 动画 */
.spinner {
    animation: spin 1s linear infinite;
    margin-right: 8px;
    margin-left: -4px;
    width: 16px;
    height: 16px;
    color: #ffffff;
}

.spinner-track {
    opacity: 0.25;
}

.spinner-head {
    opacity: 0.75;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* 消息提示框 */
.message-box {
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    font-weight: 500;
    border: 1px solid transparent;
}

.message-box.success {
    background-color: #ecfdf5;
    color: #059669;
    border-color: #a7f3d0;
}

.message-box.error {
    background-color: #fef2f2;
    color: #dc2626;
    border-color: #fecaca;
}

/* 消息动画 */
.msg-fade-enter-active,
.msg-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.msg-fade-enter-from,
.msg-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
