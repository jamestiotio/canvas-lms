/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
// @ts-expect-error -- remove once on InstUI 8
import {RadioInputGroup, RadioInput} from '@instructure/ui-radio-input'
import {ScreenReaderContent} from '@instructure/ui-a11y-content'
// @ts-expect-error -- remove once on InstUI 8
import {Checkbox} from '@instructure/ui-checkbox'
import {View} from '@instructure/ui-view'
import {Flex} from '@instructure/ui-flex'
import {Text} from '@instructure/ui-text'
import {useScope as useI18nScope} from '@canvas/i18n'

const I18n = useI18nScope('differentiated_modules')

// Doing this to avoid TS2339 errors-- remove once we're on InstUI 8
const {Item: FlexItem} = Flex as any

export interface RequirementCountInputProps {
  requirementCount: 'all' | 'one'
  requireSequentialProgress: boolean
  onChangeRequirementCount: (type: 'all' | 'one') => void
  onToggleSequentialProgress: () => void
}

export default function RequirementCountInput({
  requirementCount,
  requireSequentialProgress,
  onChangeRequirementCount,
  onToggleSequentialProgress,
}: RequirementCountInputProps) {
  return (
    <RadioInputGroup
      name="requirement-count"
      description={<ScreenReaderContent>{I18n.t('Select Requirement Count')}</ScreenReaderContent>}
    >
      <Flex>
        <FlexItem align="start">
          <RadioInput
            checked={requirementCount === 'all'}
            value="all"
            label={<ScreenReaderContent>{I18n.t('Complete all')}</ScreenReaderContent>}
            onClick={() => onChangeRequirementCount('all')}
          />
        </FlexItem>
        <FlexItem>
          <Text>{I18n.t('Complete all')}</Text>
          <View as="div">
            <Text color="secondary" size="small">
              {I18n.t('Students must complete all of these requirements.')}
            </Text>
          </View>
        </FlexItem>
      </Flex>
      {requirementCount === 'all' && (
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            checked={requireSequentialProgress}
            onChange={onToggleSequentialProgress}
            label={I18n.t('Students must move through requirements in sequential order')}
          />
        </View>
      )}
      <Flex>
        <FlexItem align="start">
          <RadioInput
            checked={requirementCount === 'one'}
            value="one"
            label={<ScreenReaderContent>{I18n.t('Complete one')}</ScreenReaderContent>}
            onClick={() => onChangeRequirementCount('one')}
          />
        </FlexItem>
        <FlexItem>
          <Text>{I18n.t('Complete one')}</Text>
          <View as="div">
            <Text color="secondary" size="small">
              {I18n.t('Students must complete one of these requirements.')}
            </Text>
          </View>
        </FlexItem>
      </Flex>
    </RadioInputGroup>
  )
}
