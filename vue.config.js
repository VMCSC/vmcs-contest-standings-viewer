module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'VMCSC Contests Leaderboard'
                return args
            })
    }
}