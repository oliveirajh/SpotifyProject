const axios = require('axios');

const getHeaders = (access_token) => (
    {'Authorization': access_token}
)
  
//Interações com o Perfil do usuário

exports.getMyProfile = async (access_token) => {
    return await axios.get("https://api.spotify.com/v1/me", {
        headers: getHeaders(access_token)
    })
}

exports.getMyTopArtists = async (access_token, limit = 5, offset = 0) => {
    //Construi um objeto URLSearchParams para adicionar os parâmetros limit e pega os valores default caso nenhum parametro seja passado
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    });
    
    const url = `https://api.spotify.com/v1/me/top/artists?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getMyTopTracks = async (access_token, limit = 5, offset = 0) => {
    //Construi um objeto URLSearchParams para adicionar os parâmetros limit e pega os valores default caso nenhum parametro seja passado
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    });

    const url = `https://api.spotify.com/v1/me/top/tracks?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getSavedTracks = async(access_token, limit = 5, offset = 0) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
    })

    const url = `https://api.spotify.com/v1/me/tracks?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

exports.getRecentlyPlayed = async(access_token, limit = 5) => {
    const params = new URLSearchParams({
        limit: limit.toString()
    })

    const url = `https://api.spotify.com/v1/me/player/recently-played?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

//Interações com o Player

exports.getCurrentTrackPlaying = async(access_token) => {
    return await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: getHeaders(access_token)
    })
}

exports.getRecentlyPlayed = async(access_token, limit = 5) => {
    const params = new URLSearchParams({
        limit: limit.toString()
    })

    const url = `https://api.spotify.com/v1/me/player/recently-played?${params.toString()}`;
    return await axios.get(url, {
        headers: getHeaders(access_token)
    })
}

//Interações com o Player

exports.getCurrentTrackPlaying = async(access_token) => {
    return await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: getHeaders(access_token)
    })
}