export default defineNuxtPlugin((nuxtApp) => {
    let loaderCounter = useState('loaderCounter', () => 0);
    return {
        provide: {
            loader: {
                isLoading: (): boolean => {
                    return loaderCounter.value > 0
                },
                startLoader: () => {
                    loaderCounter.value += 1;
                },
                stopLoader: () => {
                    loaderCounter.value -= 1;
                }
            }
        }
    }
})