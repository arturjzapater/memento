import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'

export { FadeOutView }

const FadeOutView = props => {
    const [ fadeOut ] = useState(new Animated.Value(1))

    useEffect(() => {
    Animated.timing(
        fadeOut,
        {
        toValue: 0,
        duration: 29000,
        }
    ).start()
    }, [])

    return(
        <Animated.View style={{ ...props.style, opacity: fadeOut }}>
            {props.children}
        </Animated.View>
    )
}
