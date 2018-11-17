export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export function startLoading() {
    return {
        type: START_LOADING,
        loading: true
    }
}

export function endLoading() {
    return {
        type: END_LOADING,
        loading: false
    }
}