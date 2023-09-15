'use client'

import React from 'react'
import { Textarea, TextareaProps, forwardRef } from '@chakra-ui/react'
import ResizeTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize'

type Props = TextareaAutosizeProps | TextareaProps

export const AutoResizeTextarea = forwardRef<Props, 'textarea'>((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  )
})
