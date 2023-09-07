'use client'

import React from 'react'
import { Textarea, forwardRef } from '@chakra-ui/react'
import ResizeTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize'

export const AutoResizeTextarea = forwardRef<TextareaAutosizeProps, 'textarea'>((props, ref) => {
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
