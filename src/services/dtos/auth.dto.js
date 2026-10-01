import { normalizeDishOrPureAssetUrl } from './home.dto'

export function formatAuthResponse(response){
    const data = response?.data || response || {}
    const rawUser = data?.user || {}
    const avatarUrl =rawUser?.avatar ? normalizeDishOrPureAssetUrl(rawUser.avatar) : ''

    return{
        accessToken: data?.accessToken || data?.token || '',
        refreshToken: data?.refreshToken || '',
        user : {
            id: rawUser?.id || '',
            name: rawUser?.name ||'',
            email : rawUser?.email || '',
            avatar: avatarUrl,
        },
    }
}