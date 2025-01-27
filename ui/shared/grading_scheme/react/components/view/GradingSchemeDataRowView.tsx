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

import React, {useState} from 'react'
import {useScope as useI18nScope} from '@canvas/i18n'
import {Flex} from '@instructure/ui-flex'
import {Table} from '@instructure/ui-table'
import {GradingSchemeDataRow} from '@instructure/grading-utils'
import {roundToTwoDecimalPlaces} from '../../helpers/roundDecimalPlaces'

const I18n = useI18nScope('GradingSchemeManagement')

interface ComponentProps {
  schemeScaleFactor: number
  dataRow: GradingSchemeDataRow
  highRange: number
  isFirstRow: boolean
  viewAsPercentage: boolean
}

// Doing this to avoid TS2339 errors -- TODO: remove once we're on InstUI 8
const {Item} = Flex as any
const {Row, Cell} = Table as any

const GradingSchemeDataRowView: React.FC<ComponentProps> = ({
  dataRow,
  highRange,
  isFirstRow,
  schemeScaleFactor,
  viewAsPercentage,
}) => {
  const [entryScale /* setEntryScale */] = useState<number>(
    schemeScaleFactor * (viewAsPercentage ? 100 : 1)
  )
  function renderHighRange() {
    return String(roundToTwoDecimalPlaces(highRange * entryScale))
  }

  function renderLowRange() {
    return String(roundToTwoDecimalPlaces(dataRow.value * entryScale))
  }

  return (
    <>
      <Row theme={{borderColor: 'transparent'}}>
        <Cell theme={{padding: 'none'}}>{dataRow.name}</Cell>
        <Cell theme={{padding: 'none'}}>
          <Flex display="inline-flex">
            <Item>
              <span aria-label={I18n.t('Upper limit of range')}>
                {isFirstRow ? '' : '< '}
                {renderHighRange()}
                {viewAsPercentage ? <>%</> : <></>}
              </span>
            </Item>
          </Flex>
        </Cell>
        <Cell theme={{padding: 'none'}}>
          <Flex>
            <Item padding="x-small">{I18n.t('to')}</Item>
            <Item>
              <span aria-label={I18n.t('Lower limit of range')}>
                {renderLowRange()}
                {viewAsPercentage ? <>%</> : <></>}
              </span>
            </Item>
          </Flex>
        </Cell>
      </Row>
    </>
  )
}

// Setting this component's display name to 'Row' is required so that
// instui-table (v7) allows this component to be contained by a Table Body
GradingSchemeDataRowView.displayName = 'Row'

export {GradingSchemeDataRowView}
