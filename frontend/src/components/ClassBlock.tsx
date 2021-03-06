import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Class } from '../models'
import { CLASS_BLOCK_WIDTH, CLASS_BLOCK_HEIGHT } from '../constants'

interface ClassBlockProps {
	classe: Class
	index: number
}

export default class ClassBlock extends React.Component<ClassBlockProps> {
	render() {
		return (
			<Draggable draggableId={this.props.classe.id} index={this.props.index}>
				{provided => (
					<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
						<div style={blockStyle}>
							<p style={{ textAlign: 'center' }}>{this.props.classe.title}</p>
						</div>
					</div>
				)}
			</Draggable>
		)
	}
}

const blockStyle = {
	width: CLASS_BLOCK_WIDTH,
	height: CLASS_BLOCK_HEIGHT,
	backgroundColor: '#808080',
	border: '1px solid black',
	borderRadius: 2,
	margin: 1
}
