import { useCallback, useEffect, useMemo, useState } from "react"

const datos = {
    data: null,
    isLoading: true,
    hasError: null,
}

export const useFetch = (url) => {

    const [state, setState] = useState(datos);

    const getFetch = async() => {
        const resp = await fetch(url);
        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: null
        })
      };

    useEffect(() => {
      getFetch();
    }, []);
    
  
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };

}
