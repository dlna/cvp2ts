function getFileReaderSync() {
    return !!window['FileReaderSync'] && new FileReaderSync()
}