import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'

export { FadeInView }

const FadeInView = props => {
    const [ fadeIn ] = useState(new Animated.Value(0))

    useEffect(() => {
    Animated.timing(
        fadeIn,
        {
        toValue: 1,
        duration: 400,
        }
    ).start()
    }, [])

    return(
        <Animated.View style={{ ...props.style, opacity: fadeIn }}>
            {props.children}
        </Animated.View>
    )
}
