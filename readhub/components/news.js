module.exports = {
    type: 'folder',
    style: 'article',
    async fetch({ args }) {
        let resp = await $http.get(`https://api.readhub.cn/${args.column}?lastCursor=${page || ''}&pageSize=${this.pageSize}`)
        let list = resp.data.data
        let items = list.map(data => {
            return {
                id: data.id,
                time: data.publishDate,
                title: data.title,
                link: data.mobileUrl,
                author: {
                    name: data.authorName
                },
                summary: data.summary,
                route: $route(null, {
                    id: data.id,
                    url: data.mobileUrl
                })
            }
        })
        let nextPage = null
        if (list.length > 0) {
            let publishDate = list[list.length - 1].publishDate
            nextPage = Date.parse(publishDate)
        }
        return {
            nextPage: nextPage,
            items: items
        }
    }
}