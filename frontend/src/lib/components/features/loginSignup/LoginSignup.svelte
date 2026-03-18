<script lang="ts">
	import { setAuth } from '$lib/stores/auth.svelte';
	import { login, signup } from '$lib/api/auth';

    let { loadBuilds } = $props();

	let error = $state<string | null>(null);
	let authMode = $state<'login' | 'signup'>('login');
	let authEmail = $state('');
	let authPassword = $state('');
	let authSubmitting = $state(false);

	async function handleAuthSubmit(event: SubmitEvent) {
		event.preventDefault();
		try {
			authSubmitting = true;
			error = null;
			const email = authEmail.trim();
			const password = authPassword;
			if (!email || !password) {
				error = 'Please enter email and password';
				return;
			}

			const payload =
				authMode === 'login'
					? await login(email, password)
					: await signup(email, password);

			setAuth(payload.token, payload.user.email);
			authPassword = '';
			await loadBuilds();
		} catch (err) {
			// error =
			// 	err instanceof Error ? err.message : authMode === 'login'
			// 		? 'Failed to log in'
			// 		: 'Failed to sign up';
            error = authMode === 'login' ? 'Failed to log in' : 'Failed to sign up';
			console.error('Auth error:', err);
		} finally {
			authSubmitting = false;
		}
	}

    function onAuthModeChange() {
        authMode = authMode === 'login' ? 'signup' : 'login';
        error = null;
    }
</script>

<section class="min-h-screen flex items-center justify-center">
    <div class="flex flex-col gap-4 w-full max-w-md rounded-xl bg-genshin-blue-darker p-6 shadow-lg">
        <h1 class="text-center text-2xl text-genshin-gold">
            Genshin Build Progress
        </h1>
        <div class="flex justify-center gap-2 text-sm">
            <button
                class={`rounded-full px-3 py-1 ${authMode === 'login'
                    ? 'bg-genshin-gold text-genshin-blue-darker'
                    : 'bg-slate-700 text-white/80'}`}
                disabled={authMode === 'login'}
                onclick={onAuthModeChange}
            >
                Log in
            </button>
            <button
                class={`rounded-full px-3 py-1 ${authMode === 'signup'
                    ? 'bg-genshin-gold text-genshin-blue-darker'
                    : 'bg-slate-700 text-white/80'}`}
                    disabled={authMode === 'signup'}
                onclick={onAuthModeChange}
            >
                Sign up
            </button>
        </div>

        <form class="space-y-4" onsubmit={handleAuthSubmit}>
            <label class="flex flex-col gap-1 text-sm text-white/80">
                <p>Email</p>
                <input
                    type="email"
                    bind:value={authEmail}
                    class="w-full rounded-md border border-genshin-blue bg-slate-800/80 px-3 py-2 text-sm text-white/80 outline-none focus:border-genshin-gold"
                    autocomplete="email"
                    required
                />
            </label>

            <label class="flex flex-col gap-1 text-sm text-white/80">
                <p>Password</p>
                <input
                    type="password"
                    bind:value={authPassword}
                    class="w-full rounded-md border border-genshin-blue bg-slate-800/80 px-3 py-2 text-sm text-white/80 outline-none focus:border-genshin-gold"
                    autocomplete={authMode === 'login' ? 'current-password' : 'new-password'}
                    required
                    minlength="6"
                />
            </label>

            {#if error}
                <p class="text-sm text-red-400">{error}</p>
            {/if}

            <button
                type="submit"
                class="flex w-full items-center justify-center rounded-md bg-genshin-gold py-2 text-sm font-medium text-genshin-blue-darker transition hover:bg-genshin-gold/80 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={authSubmitting}
            >
                {authSubmitting
                    ? authMode === 'login'
                        ? 'Logging in...'
                        : 'Signing up...'
                    : authMode === 'login'
                        ? 'Log in'
                        : 'Sign up'}
            </button>
        </form>
    </div>
</section>
