export default function allowOnlyNumbers(e: InputEvent) {
    if (e.inputType.startsWith('delete')) return;
    if (e.data && !/^\d+$/.test(e.data)) {
        e.preventDefault();
    }
}
